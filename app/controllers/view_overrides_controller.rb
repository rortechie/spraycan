class ViewOverridesController < ActionController::Base
  ActiveRecord::Base.include_root_in_json = false
  layout 'themer'

  before_filter :set_replacement, :only => [:create, :update]

  def index

    render :json => ViewOverride.all
  end

  def create
    @override = ViewOverride.create params
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
    def set_replacement
      puts(params[:replace_text])

      params[:replacement] = case params[:replace_with].to_sym
        when :text then params.delete(:replace_text)
        when :partial then params.delete(:replace_parital)
        when :template then params.delete(:replace_template)
      end

      [:replace_text, :replace_partial, :replace_template, :controller, :action].each {|replacement| params.delete(replacement) }
    end
end
