class Spraycan::StylesheetsController < Spraycan::BaseController
  respond_to :css, :json

  after_filter :clear_sprockets_assets, :only => [:create, :update, :destroy]
  before_filter :set_theme, :only => [:index, :create]

  def index
    @stylesheets = @theme.stylesheets
    respond_with @stylesheets
  end

  def show
    @stylesheet = Spraycan::tylesheet.where(:name => params[:id]).first

    respond_with @stylesheet
  end

  def create
    @stylesheet = @theme.stylesheets.create params[:stylesheet]
    respond_with @stylesheet
  end

  def update
    @stylesheet = Spraycan::Stylesheet.where(:id => params.delete(:id)).first
    @stylesheet.update_attributes params[:stylesheet]

    respond_with @stylesheet
  end

  def destroy
    render :json => Spraycan::Stylesheet.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Spraycan::Theme.find(params[:theme_id])
    end

end
