class DefaceEditor::StylesheetsController < DefaceEditor::BaseController
  respond_to :css, :json

  after_filter :clear_sprockets_assets, :only => [:create, :update, :destroy]
  before_filter :set_theme, :only => [:index, :create]

  def index
    @stylesheets = @theme.stylesheets
    respond_with @stylesheets
  end

  def show
    @stylesheet = DefaceEditor::tylesheet.where(:name => params[:id]).first

    respond_with @stylesheet
  end

  def create
    @stylesheet = @theme.stylesheets.create params[:stylesheet]
    respond_with @stylesheet
  end

  def update
    @stylesheet = DefaceEditor::Stylesheet.where(:id => params.delete(:id)).first
    @stylesheet.update_attributes params[:stylesheet]

    respond_with @stylesheet
  end

  def destroy
    render :json => DefaceEditor::Stylesheet.destroy(params[:id])
  end

  private
    def set_theme
      @theme = DefaceEditor::Theme.find(params[:theme_id])
    end

end
