require 'deface'

module DefaceEditor
  extend ActiveSupport::Autoload
  LIBPATH = File.dirname(__FILE__)

  autoload :Configuration
  autoload :SetupConfig
  autoload :Templates

  include SetupConfig
end

require 'deface_editor/railtie'

