class Spraycan::JavascriptsController < Spraycan::BaseController
  respond_to :json

  before_filter :set_theme, :only => [:index, :create]

  def index
    @javascripts = @theme.javascripts
    respond_with @javascripts
  end

  def show
    @javascript = Spraycan::Javascript.where(:name => params[:id]).first

    respond_with @javascript
  end

  def create
    @javascript = @theme.javascripts.create params[:javascript]
    respond_with @javascript
  end

  def update
    @javascript = Spraycan::Javascript.where(:id => params.delete(:id)).first
    @javascript.update_attributes params[:javascript]

    respond_with @javascript
  end

  def destroy
    render :json => Spraycan::Javascript.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Spraycan::Theme.find(params[:theme_id])
    end

end

