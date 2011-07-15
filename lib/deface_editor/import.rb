module DefaceEditor
  class Import
    def self.execute(engine)
      name = engine.engine_name
      @theme = DefaceEditor::Theme.where(:name => name).first
      @theme ||= DefaceEditor::Theme.create(:name => name, :active => true)
      @theme.update_attribute(:imported_from, name)

      [:javascripts, :stylesheets, :graphics].each {|association| @theme.send(association).delete_all }

      editable_config_file = File.join(engine.root, "config" , "editable_assets.yml")

      if File.exists?(editable_config_file)
        begin
          editable = YAML::load(IO.read(editable_config_file))

          editable.each do |path, directories|
            next unless engine.paths.key?(path)

            enumerate_and_import(engine.root, engine.paths[path], directories["javascripts"], :javascripts, :js) if directories.key?("javascripts")
            enumerate_and_import(engine.root, engine.paths[path], directories["stylesheets"], :stylesheets, :css) if directories.key?("stylesheets")
            enumerate_and_import(engine.root, engine.paths[path], directories["images"], :graphics, :file, 'images', true) if directories.key?("images")
          end

        rescue Exception => e
          puts e.message, e.backtrace
          #bad things happen to good people
        end
      end

    end

    private

      def self.enumerate_and_import(engine_root, paths, files, association, attr, source=nil, binary=false)
        source ||= association.to_s

        paths.each do |path|
          base_path = File.join(engine_root, path, source)

          files.each do |file|
            full_path = File.join(base_path, file)
            next unless File.file? full_path

            relative_path = full_path.to_s.gsub(base_path, "")
            relative_path = relative_path[1..-1] if relative_path.first == "/"

            if binary
              @theme.send(association).create(:name => relative_path, attr => File.open(full_path, "r"))
            else
              @theme.send(association).create(:name => relative_path, attr => IO.read(full_path))
            end
          end 
        end

      end
  end
end
