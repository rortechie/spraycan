class DefaceEditor::Graphic < ActiveRecord::Base
  belongs_to :theme

  mount_uploader :file, GraphicUploader

  def body
    self.file.read
  end
end
