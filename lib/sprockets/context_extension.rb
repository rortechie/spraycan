module Sprockets
  Context.class_eval do
    include ActiveRecordHelper

    alias_method :sprockets_evaluate, :evaluate

    def evaluate(filename, options = {})
      if record = find_active_record_asset(pathname)
        options.clear
        options[:data] = record.body
      end

      sprockets_evaluate(filename, options)
    end


    alias_method :sprockets_resolve, :resolve

    def resolve(path, options = {}, &block)
      
      if record = find_active_record_asset(path, content_type)
        path
      else
        sprockets_resolve(path, options, &block)
      end
    end
  end
end
