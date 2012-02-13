class CompileSweeper < ActionController::Caching::Sweeper
  observe Spraycan::Theme, Spraycan::Javascript, Spraycan::Stylesheet, Spraycan::Palette

  def after_save(model)
    self.expire_compiled
  end

  def after_destory(model)
    self.expire_compiled
  end

  def self.expire_compiled
    cache_dir = Rails.root.join('public')

    FileUtils.rm(cache_dir.join "spraycan/#{Apartment::Database.current_database}/compiled.css" ) rescue Errno::ENOENT
    FileUtils.rm(cache_dir.join "spraycan/#{Apartment::Database.current_database}/compiled.js" ) rescue Errno::ENOENT
  end

end
