class Deface::StylesheetsController < ActionController::Base
  respond_to :css, :json

  before_filter :set_theme, :only => [:index, :create]

  def index
    respond_with @theme.stylesheets
  end

  def show
    @stylesheet = Stylesheet.where(:name => params[:id]).first

    respond_to do |format|
      format.css { render :text => @stylesheet.css }
      format.json { render :json => @stylesheet.to_json }
    end
  end

  def create
    params.delete(:action)
    params.delete(:controller)

    @stylesheet = @theme.stylesheets.create params
    render :json => @stylesheet
  end

  def update
    params.delete(:action)
    params.delete(:controller)

    @stylesheet = Stylesheet.where(:id => params.delete(:id)).first
    @stylesheet.update_attributes params

    render :json => @stylesheet
  end

  def destroy
    Stylesheet.destroy(params[:id])

    render :json => "true"
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

end
