class DefaceEditor::TemplatesController < DefaceEditor::BaseController
  respond_to :json

  def index
    @templates = DefaceEditor::Templates[params["deface_controller"], params["deface_action"]]
    respond_with @templates
  end
end
