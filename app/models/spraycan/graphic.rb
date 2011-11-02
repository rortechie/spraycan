require "fileutils"

class Spraycan::Graphic < ActiveRecord::Base
  belongs_to :theme

  mount_uploader :file, GraphicUploader

  after_save :sprockets_dump
  after_destroy :remove_sprockets_dump

  def body
    self.file.read
  end

  def sprockets_dump(root_path=nil)
    File.open(sprocket_dump_path(root_path), 'w') {|f| f.write(self.body) } 
  end

  private 
    def sprocket_dump_path(root_path=nil)
      self.theme.sprockets_dump_asset_directories
      root_path ||= self.theme.sprockets_dump_root

      file_path = root_path.join("images", self.file_before_type_cast)

      FileUtils.mkdir_p file_path.dirname

      file_path
    end

    def remove_sprockets_dump
      FileUtils.rm sprocket_dump_path
    end
end
