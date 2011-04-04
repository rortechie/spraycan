module DefaceEditor
  module Config
    #allows overrides to be applied to views
    @@enable_overrides = true
    mattr_accessor :enable_overrides


    #allows editor to be used
    @@enable_editor = true
    mattr_accessor :enable_editor

    #which virutal paths (templates) should the site specific
    #deface helpers be included in (hint, should contain HEAD tag)
    @@editor_virtual_paths = ["layouts/application"]
    mattr_accessor :editor_virtual_paths

  end
end
