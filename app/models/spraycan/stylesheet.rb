require "fileutils"

class Spraycan::Stylesheet < ActiveRecord::Base
  include Spraycan::SprocketsHelper

  belongs_to :theme

  before_save :check_name_change
  after_save :sprockets_dump
  after_destroy :remove_sprockets_dump

  def body
    self.css
  end

  def style_id
    self.name.gsub('/', '-').gsub('.css', '')
  end

  private
    def sprocket_dump_path(root_path=nil)
      self.theme.sprockets_dump_asset_directories
      root_path ||= self.theme.sprockets_dump_root

      file_path = root_path.join("stylesheets", self.name)

      FileUtils.mkdir_p file_path.dirname

      file_path.to_s.include?(".css") ? file_path.to_s : file_path.to_s << ".css"
    end

    def remove_sprockets_dump
      FileUtils.rm sprocket_dump_path rescue nil
    end

    def check_name_change
      return if self.new_record?

      if self.changed.include? "name"
        file_path = self.theme.sprockets_dump_root.join("stylesheets", self.changes["name"].first)
        file_path = file_path.to_s << ".css" unless file_path.to_s.include?(".css")
        FileUtils.rm file_path
      end
    end
end
