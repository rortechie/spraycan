class Deface::ViewOverridesController < Deface::BaseController
  ActiveRecord::Base.include_root_in_json = false
  layout 'deface'

  before_filter :set_theme, :only => [:index, :create]
  before_filter :set_replacement, :only => [:create, :update]
  after_filter :clear_resolver_cache, :only => [:create, :update, :destroy]

  def index
    render :json => @theme.view_overrides
  end

  def create
    @override = @theme.view_overrides.create params
    render :json => @override
  end

  def update
    @override = ViewOverride.where(:id => params.delete(:id)).first
    @override.update_attributes params

    render :json => @override
  end

  def destroy
    ViewOverride.destroy(params[:id])

    render :json => "true"
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

    def set_replacement
      puts(params[:replace_text])

      params[:replacement] = case params[:replace_with].to_sym
        when :text then params.delete(:replace_text)
        when :partial then params.delete(:replace_parital)
        when :template then params.delete(:replace_template)
      end

      [:replace_text, :replace_partial, :replace_template, :controller, :action].each {|replacement| params.delete(replacement) }
    end

    # Clears all cached ActionView Templates, forcing re-compile
    def clear_resolver_cache
      @lookup_context.view_paths.map(&:clear_cache)
    end
end
