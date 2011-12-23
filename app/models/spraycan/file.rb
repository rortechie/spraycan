require "fileutils"

class Spraycan::File < ActiveRecord::Base
  belongs_to :theme

  mount_uploader :file, GraphicUploader

  before_save :set_name

  def body
    self.file.read
  end

  def url
    asset_path(self.name)
  end

  def image?
    %w{jpg jpeg png gif}.include? name.split('.')[1]
  end

  private 
    def set_name
      self.name = file.file.filename
    end
end
