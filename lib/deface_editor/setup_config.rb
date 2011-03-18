module DefaceEditor

  module SetupConfig
    extend ActiveSupport::Concern

    module ClassMethods

      # See DefaceEditor::Configuration for details.
      attr_accessor :configuration

      # Call this method to customize the behavior of deface_editor .
      #
      # @example
      #   DefaceEditor.config do |config|
      #     config.is_enabled = true
      #   end
      def config
        self.configuration ||= Configuration.new
        block_given? ? yield(configuration) : configuration
      end
    end

  end
end

