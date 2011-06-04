class Deface::GraphicsController < Deface::BaseController
  respond_to :json, :js

  before_filter :set_theme, :only => [:index, :create]

  def index
    respond_with @theme.graphics
  end


  def create
    @graphic = @theme.graphics.create params[:graphic]
    render :js => "var new_url = '#{@graphic.file.url}';"
  end

  def destroy
    Graphic.destroy(params[:id])

    render :json => "true"
  end

  private
    def set_theme
      @theme = Theme.find(params[:theme_id])
    end

end

