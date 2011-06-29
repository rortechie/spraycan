include DefaceHelper

class Deface::StylesheetsController < Deface::BaseController
  respond_to :css, :json

  before_filter :set_theme, :only => [:index, :create]

  def index
    @stylesheets = @theme.stylesheets
    respond_with @stylesheets
  end

  def show
    @stylesheet = Stylesheet.where(:name => params[:id]).first

    respond_with @stylesheet
  end

  def create
    @stylesheet = @theme.stylesheets.create pick(params, :name, :css)

    respond_with @stylesheet
  end

  def update
    @stylesheet = Stylesheet.where(:id => params.delete(:id)).first
    @stylesheet.update_attributes pick(params, :name, :css)

    respond_with @stylesheet
  end

  def destroy
    render :json => Stylesheet.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

end
