class Spraycan::FilesController < Spraycan::BaseController
  respond_to :json, :js

  before_filter :set_theme, :only => [:index, :create]

  def index
    @files = @theme.files

    respond_with @files
  end

  def create
    @file = @theme.files.create params[:file]
    respond_with @file
  end

  def destroy
    render :json => Spraycan::File.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Spraycan::Theme.find(params[:theme_id])
    end

end

