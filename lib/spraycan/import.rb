module Spraycan
  class Import
    def self.execute(engine)
      name = engine.engine_name
      @theme = Spraycan::Theme.where(:name => name).first
      @theme ||= Spraycan::Theme.create(:name => name, :active => true)
      @theme.update_attribute(:imported_from, name)

      [:javascripts, :stylesheets, :files, :view_overrides].each {|association| @theme.send(association).delete_all }

      assets_path = engine.root.join(engine.paths["app/assets"].to_s) #might be custom, so need to get it this way

      enumerate_and_import(assets_path.join("javascripts"), :javascripts, :js)
      enumerate_and_import(assets_path.join("stylesheets"), :stylesheets, :css)
      enumerate_and_import(assets_path.join("images"), :files, :file, 'images', true)

      import_overrides(engine.root.join("app/overrides"))
    end

    private

      def self.enumerate_and_import(base_path, association, attr, source=nil, binary=false)
        source ||= association.to_s

        search_path = binary ? base_path.join("**/*.*") : base_path.join("**/*.#{attr}")

        Dir.glob(search_path) do |file|
          next unless ::File.file? file

          relative_path = file.gsub(base_path, "")
          relative_path = relative_path[1..-1] if relative_path.first == "/"

          if binary
            @theme.send(association).create(:name => relative_path, attr => ::File.open(file, "r"))
          else
            @theme.send(association).create(:name => relative_path, attr => IO.read(file))
          end
        end
      end

      def self.import_overrides(base_path)
        search_path = base_path.join("**/*.rb")

        Dir.glob(search_path) do |file|
          next unless ::File.file? file

          Deface::Override.all.clear
          load(file)

          Deface::Override.all.values.each do |virtual_path|
            virtual_path.each do |name, override|
              new_override = @theme.view_overrides.new(:name          => name,
                                              :virtual_path  => override.args[:virtual_path],
                                              :target        => override.action,
                                              :selector      => override.args[override.action],
                                              :disabled      => override.args[:diabled])

              if override.args[:closing_selector].present?
                new_override.closing_selector = override.args[:closing_selector]
              end 

              if override.action == :set_attributes
                new_override.replace_with = "attributes"
                new_override.replacement = override.args[:attributes].inspect rescue '{}'
              else

                if override.args.key? :text
                  new_override.replace_with = "text"
                  new_override.replacement  = override.args[:text]
                elsif override.args.key? :partial
                  new_override.replace_with = "partial"
                  new_override.replacement  = override.args[:partial]
                elsif override.args.key? :partial
                  new_override.replace_with = "partial"
                  new_override.replacement  = override.args[:template]
                else
                  new_override.replace_with = "text"
                end

              end

              if sequence = override.args[:sequence]
                if sequence.is_a? Hash
                  if sequence.key? :before
                    new_override.sequence = "before"
                  elsif sequence.key? :after
                    new_override.sequence = "after"
                  end

                  new_override.sequence_target = sequence[:before] || sequence[:after]
                else
                  new_override.sequence = sequence
                end
              end

              new_override.save!
            end
          end

        end
      end
  end
end
