class DefaceEditor::Stylesheet < ActiveRecord::Base
  belongs_to :theme

  def body
    self.css
  end
end
