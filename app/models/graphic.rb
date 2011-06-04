class Graphic < ActiveRecord::Base
  belongs_to :theme

  mount_uploader :file, GraphicUploader
end
