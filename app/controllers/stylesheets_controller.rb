class StylesheetsController < ActionController::Base
  def show
    respond_to do |format|
      format.css do
        render :text => Stylesheet.where(:name => params[:id]).first.css
      end
    end
  end
end
