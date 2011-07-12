class Deface::JavascriptsController < Deface::BaseController
  respond_to :css, :json

  after_filter :clear_sprockets_assets, :only => [:create, :update, :destroy]
  before_filter :set_theme, :only => [:index, :create]

  def index
    @javascripts = @theme.javascripts
    respond_with @javascripts
  end

  def show
    @javascript = Javascript.where(:name => params[:id]).first

    respond_with @javascript
  end

  def create
    @javascript = @theme.javascripts.create params[:javascript]
    respond_with @javascript
  end

  def update
    @javascript = Javascript.where(:id => params.delete(:id)).first
    @javascript.update_attributes params[:javascript]

    respond_with @javascript
  end

  def destroy
    render :json => Javascript.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

end

