module Spraycan
  module Templates
    extend Deface::TemplateHelper

    @@templates = {}
    @@actions   = {}

    def self.[](controller, action)
      @@templates[@@actions[key(controller, action)]]
    end

    def self.add_template(transaction_id, payload)
      path = payload[:virtual_path]
      return if path.nil?

      if path.include? "views"
        dirs = path.split("/")
        path = dirs[dirs.index("views")+1..-1].join("/")
      end

      unless @@templates.key? transaction_id
        @@templates[transaction_id] = {}
      end

      unless @@templates[transaction_id].key?(path)
        parts = path.split("/")

        if parts.size == 2
          prefix = ""
          name = path
        else
          prefix = parts.shift
          name = parts.join("/")
        end

        begin
          source  = load_template_source(path, false)
          escaped = source.clone
          hooks   = []
          doc     = Deface::Parser.convert(escaped)

          doc.css("[data-hook]").each do |match|
            name = match.attr("data-hook") == "" ? match.attr("id") : match.attr("data-hook")
            hooks << { :name => name, :source => Deface::Parser.undo_erb_markup!(match.to_s.dup) }
          end
        rescue
          source  ||= ""
          escaped ||= ""
        end

        @@templates[transaction_id][path] = { :source => source, :escaped => escaped, :hooks => hooks }
      end
    end

    def self.add_action(transaction_id, payload)
      return unless payload.key? :params

      @@actions[key(payload[:params]["controller"], payload[:params]["action"]) ] = transaction_id
    end

    private

      def self.key(controller, action)
        "#{controller}##{action}"
      end

  end

end
