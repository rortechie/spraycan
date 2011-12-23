class Spraycan::PalettesController < Spraycan::BaseController
  respond_to :json

  def index
    @palettes = Spraycan::Palette.all
    respond_with @palettes
  end

  def create
    @palette = Spraycan::Palette.create params[:palette]

    respond_with @palette
  end

  def update
    @palette = Spraycan::Palette.where(:id => params.delete(:id)).first
    @palette.update_attributes params[:palette]

    respond_with @palette
  end

  def destroy
    render :js => Spraycan::Palette.destroy(params[:id]).to_s
  end

end
