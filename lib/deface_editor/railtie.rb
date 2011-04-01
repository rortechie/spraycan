module DefaceEditor
  class Engine < Rails::Engine
    config.autoload_paths += %W(#{root}/lib)

    def self.activate

      if DefaceEditor.config.is_allowed_to_edit
        #define overrides needed for theming UI
        ["shared/_head", "layouts/spree_application", "layouts/admin"].each do |layout|
          Deface::Override.new(:virtual_path => layout,
                          :name => "_deface_editor_ui",
                          :insert_top => "head",
                          :partial => "deface/shared/layout_scripts")

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

      #clear all WIP overrides, they get reloaded below
      Deface::Override.all.each do |virtual_path, overrides|
        overrides.reject! {|name, override| name[0..4] == "_wip_" }
      end

      #load all overrides from db
      if ViewOverride.table_exists?
        @active_theme = Theme.active.first
        @active_theme.view_overrides.map(&:initiate) if @active_theme.present?
      end
    end

    config.to_prepare &method(:activate).to_proc
  end
end

