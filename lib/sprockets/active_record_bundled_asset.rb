module Sprockets
  class ActiveRecordBundledAsset < BundledAsset

    def initialize(environment, logical_path, pathname, options, active_record)
      @environment  = environment
      @context      = environment.context_class.new(environment, logical_path.to_s, pathname)

      @logical_path = logical_path.to_s
      @pathname     = pathname
      @content_type = environment.content_type_of(pathname)
      @active_record = active_record

      @assets       = []
      @source       = nil
      @body         = active_record.body #context.evaluate(pathname)

      index    = options[:_environment] || options[:_index] || environment
      requires = options[:_requires] || []
      if requires.include?(pathname.to_s)
        raise CircularDependencyError, "#{pathname} has already been required"
      end
      requires << pathname.to_s

      compute_dependencies!(index, requires)
      compute_dependency_paths!
    end

    private
      def depend_on(path)
        if path.exist?
          super
        else
          dependency_paths << path
        end
      end

  end
end
