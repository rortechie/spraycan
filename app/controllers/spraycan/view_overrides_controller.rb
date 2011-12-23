class Spraycan::ViewOverridesController < Spraycan::BaseController
  layout 'spraycan/editor'

  before_filter :set_theme, :only => [:index, :create]
  after_filter :clear_resolver_cache, :only => [:create, :update, :destroy]

  respond_to :json

  def index
    @view_overrides = @theme.view_overrides
    respond_with @view_overrides
  end

  def create
    @view_override = @theme.view_overrides.create params[:view_override]

    respond_with @view_override
  end

  def update
    @view_override = Spraycan::ViewOverride.where(:id => params.delete(:id)).first
    @view_override.update_attributes params[:view_override]

    respond_with @view_override
  end

  def destroy
    render :json => Spraycan::ViewOverride.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Spraycan::Theme.find(params[:theme_id])
    end

end
