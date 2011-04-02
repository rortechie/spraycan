module DefaceEditor
  module Config

    @@enable_overrides = true
    mattr_accessor :enable_overrides

    @@enable_editor = true
    mattr_accessor :enable_editor

    @@editor_virtual_paths = ["shared/_head", "layouts/spree_application", "layouts/admin"]
    mattr_accessor :editor_virtual_paths

  end
end
