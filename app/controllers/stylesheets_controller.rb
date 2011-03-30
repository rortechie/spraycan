class StylesheetsController < ActionController::Base
  respond_to :css, :json

  def index
    respond_with Stylesheet.all
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

    @stylesheet = Stylesheet.create params
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

end
