namespace :spraycan do
  desc 'Import Theme from engine'
  task :import_railtie_assets, [:name] => [:environment] do |t, args|
    railtie = Rails.application.railties.all.detect {|r| r.railtie_name == args[:name] }
    if railtie.nil?
      puts "Railtie named '#{args[:name]}' is not loaded."
    else
      Spraycan::Import.execute(railtie)
    end
  end

  desc 'Export Theme to engine'
  task :export_railtie_assets, [:name] => [:environment] do |t, args|
    railtie = Rails.application.railties.all.detect {|r| r.railtie_name == args[:name] }
    if railtie.nil?
      puts "Railtie named '#{args[:name]}' is not loaded."
    else
      Spraycan::Export.new.execute(railtie)
    end

  end

  desc 'Dump all themes to a single file'
  task :dump => :environment do
    output = []
    Spraycan::Theme.all.inject(output) do |output, theme|
      output << JSON.parse(theme.export)
    end

    path = File.join(Dir.pwd, 'themes.json')

    File.open(path, 'w') {|f| f.write(output.to_json) }

    puts "All themes exported to: #{path}"
  end

  desc 'Batch import multiple themes from a single file'
  task :load => :environment do

    path = File.join(Dir.pwd, 'themes.json')

    if File.exists? path
      Spraycan::Theme.import_multiple_from_string(File.open(path).read)
      puts "Imported theme(s) from #{path}"
    else
      puts "Could not find import at #{path}"
    end
  end
end
