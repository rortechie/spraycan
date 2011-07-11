class Deface::ViewOverridesController < Deface::BaseController
  layout 'deface'

  before_filter :set_theme, :only => [:index, :create]
  before_filter :set_replacement, :only => [:create, :update]
  after_filter :clear_resolver_cache, :only => [:create, :update, :destroy]

  respond_to :json

  def deface
    #editor boot method
    if Theme.active.empty?
      if Theme.all.empty?
        Theme.create(:name => "Site Theme", :active => true)
      else
        Theme.first.update_attribute(:active, true)
      end
    end
  end

  def index
    @view_overrides = @theme.view_overrides
    respond_with @view_overrides
  end

  def create
    @view_override = @theme.view_overrides.create params[:view_override]

    respond_with @view_override
  end

  def update
    @view_override = ViewOverride.where(:id => params.delete(:id)).first
    @view_override.update_attributes params[:view_override]

    respond_with @view_override
  end

  def destroy
    render :json => ViewOverride.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

    def set_replacement
      params[:view_override][:replacement] = case params[:view_override][:replace_with].to_sym
        when :text then params[:view_override].delete(:replace_text)
        when :partial then params[:view_override].delete(:replace_parital)
        when :template then params[:view_override].delete(:replace_template)
      end

      [:replace_text, :replace_partial, :replace_template].each {|replacement| params[:view_override].delete(replacement) }
    end


end
