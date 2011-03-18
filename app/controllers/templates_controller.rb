class TemplatesController < ActionController::Base
  def index

    @templates =  DefaceEditor::Templates[params["deface_controller"], params["deface_action"]]
    #@templates =  DefaceEditor::Templates["products", "index"]

    all_templates = []
    @templates.each_with_index do |template,i|
      all_templates << { :id => template.id, :name => template[0], :hooks => template[1][:hooks] }
    end


    render :json => all_templates.to_json
  end
end
