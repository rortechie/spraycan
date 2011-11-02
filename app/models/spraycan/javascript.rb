class Spraycan::Javascript < ActiveRecord::Base
  belongs_to :theme

  before_save :check_name_change
  after_save :sprockets_dump
  after_destroy :remove_sprockets_dump

  def body
    self.js
  end

  def sprockets_dump(root_path=nil)
    File.open(sprocket_dump_path(root_path), 'w') {|f| f.write(self.body) } 
  end

  private
    def sprocket_dump_path(root_path=nil)
      self.theme.sprockets_dump_asset_directories
      root_path ||= self.theme.sprockets_dump_root

      file_path = root_path.join("javascripts", self.name)

      FileUtils.mkdir_p file_path.dirname

      file_path.to_s.include?(".js") ? file_path.to_s : file_path.to_s << ".js"
    end
    
    def remove_sprockets_dump
      FileUtils.rm sprocket_dump_path
    end

    def check_name_change
      return if self.new_record?

      if self.changed.include? "name"
        file_path = self.theme.sprockets_dump_root.join("javascripts", self.changes["name"].first)
        file_path = file_path.to_s << ".js" unless file_path.to_s.include?(".js")
        FileUtils.rm file_path
      end
    end
end
