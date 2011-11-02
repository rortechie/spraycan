namespace :spraycan do
  desc 'Import Theme'
  task :import_railtie_assets, [:name] => [:environment] do |t, args|
    railtie = Rails.application.railties.all.detect {|r| r.railtie_name == args[:name] }
    if railtie.nil?
      puts "Railtie named '#{args[:name]}' is not loaded."
    else
      Spraycan::Import.execute(railtie)
    end
  end

  desc 'Export Theme'
  task :export_railtie_assets, [:name] => [:environment] do |t, args|
    railtie = Rails.application.railties.all.detect {|r| r.railtie_name == args[:name] }
    if railtie.nil?
      puts "Railtie named '#{args[:name]}' is not loaded."
    else
      Spraycan::Export.new.execute(railtie)
    end

  end
end
