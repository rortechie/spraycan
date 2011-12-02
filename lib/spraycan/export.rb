require 'thor'

module Spraycan
  class Export < Thor
    include Thor::Actions
    
    source_root(Dir.pwd)
   
    no_tasks do #stop Thor warnings

      def execute(railtie)
        @theme = Spraycan::Theme.where(:name => railtie.engine_name).first
        if @theme.nil?
          puts "Theme named '#{railtie.engine_name}' cannot be found."
        else

          asset_base_path = Pathname.new(railtie.root.join("app", "assets"))

          @theme.javascripts.each do |javascript|
            create_file ::File.join(asset_base_path, "javascripts", "#{javascript.name}.js"), javascript.body
          end

          @theme.stylesheets.each do |stylesheet|
            create_file ::File.join(asset_base_path, "stylesheets", "#{stylesheet.name}.css"), stylesheet.body
          end

          @theme.files.each do |file|
            next unless ::File.exist? file.file.path
            copy_file file.file.path, ::File.join(asset_base_path, "images", file.name)
          end


          overrides_path = ::File.join(asset_base_path, "../", "overrides")

          @theme.view_overrides.each do |override|
            sequence = override.sequence_target.blank? ? 100 : {override.sequence.to_sym => override.sequence_target}

            create_file ::File.join(overrides_path, "#{override.name}.rb") do
              %Q{Deface::Override.new(:virtual_path => %q{#{override.virtual_path}},
                          :name => %q{#{override.name}},
                          :#{override.target} => %q{#{override.selector}},
                          :closing_selector => %q{#{override.closing_selector}},
                          :#{override.replace_with} => %q{#{override.replacement}},
                          :disabled => #{override.disabled},
                          :sequence => #{sequence})\n\n}
            end
          end

          Dir.glob(File.join(overrides_path, "/*.rb")) do |path|
            path = Pathname.new(path)
            name = path.basename.to_s.gsub(path.extname, "")
            unless @theme.view_overrides.map(&:name).include? name
              remove_file path.to_s
            end
          end


        end

      end

    end

  end
end
