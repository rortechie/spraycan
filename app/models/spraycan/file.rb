require "fileutils"

class Spraycan::File < ActiveRecord::Base
  include Sprockets::Helpers::RailsHelper
  include Sprockets::Helpers::IsolatedHelper

  belongs_to :theme

  mount_uploader :file, GraphicUploader

  before_save :set_name
  after_save :sprockets_dump
  after_destroy :remove_sprockets_dump

  def body
    self.file.read
  end

  def sprockets_dump(root_path=nil)
    File.open(sprocket_dump_path(root_path), 'w') {|f| f.write(self.body) } 
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
