class Spraycan::TemplatesController < Spraycan::BaseController
  respond_to :json

  def index
    @templates = Spraycan::Templates[params["spraycan_controller"], params["spraycan_action"]]
    respond_with @templates
  end
end
