module Sprockets
  module ActiveRecordHelper
    def find_active_record_asset(path, content_type = nil)
      pathname = Pathname.new(path)


      if content_type.nil?
        filename = pathname.basename.to_s.gsub(pathname.extname, "")
      else
        filename = pathname.to_s
      end

      debugger if path.to_s == "rdr.css"

      content_type ||= case pathname.extname
        when ".css"
          "text/css"
        when ".js"
          "text/js"
      end

      record = case content_type
        when "text/css"
          DefaceEditor::Stylesheet.where(:name => filename).first
        when "text/js"
          DefaceEditor::Javascript.where(:name => filename).first
        else
          DefaceEditor::Graphic.where(:name => filename).first
      end

      record
    end
  end
end
