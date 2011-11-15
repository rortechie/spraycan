module Spraycan
  class Environment
    attr_accessor :enable_editor, :editor_virtual_paths
    def initialize
      @enable_editor        = true
      @editor_virtual_paths = ["layouts/application"]
    end
  end
end

