require 'guid' 
require 'rabl'

module DefaceEditor
  class Engine < Rails::Engine
    railtie_name "deface_editor"

    config.autoload_paths += %W(#{root}/lib)

    def self.activate

      if DefaceEditor::Config.enable_editor

        #define overrides needed for theming UI
        DefaceEditor::Config.editor_virtual_paths.each do |layout|
          Deface::Override.new(:virtual_path => layout,
                          :name => "_deface_editor_ui",
                          :insert_bottom => "head",
                          :partial => "deface_editor/shared/layout_scripts")

        end

        #catch all template renders for use in dropdown
        ActiveSupport::Notifications.subscribe(/render/) do |*args|
          DefaceEditor::Templates.add_template(args[3], args[4])
        end

        #catch all controller action processing
        ActiveSupport::Notifications.subscribe(/start_processing.action_controller/) do |*args|
          DefaceEditor::Templates.add_action(args[3], args[4])
        end

      end

      self.reset_overrides
    end

    def self.reset_overrides
      if DefaceEditor::Config.enable_overrides
        #clear all WIP overrides, they get reloaded below
        Deface::Override.all.each do |virtual_path, overrides|
          overrides.reject! {|name, override| override.args[:from_editor] }
        end

        #load all overrides from db
        if DefaceEditor::Theme.table_exists?
          DefaceEditor::Theme.active.each { |theme| theme.view_overrides.map(&:initiate) }
        end
      end

    end

    config.to_prepare &method(:activate).to_proc
  end
end

