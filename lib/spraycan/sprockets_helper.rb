module Spraycan
  module SprocketsHelper
    #force sprockets to dump it's cache
    def expire_asset(absolute_path, logical_path, default_ext = nil)
      return unless Rails.application.assets.is_a? Sprockets::Index

      if default_ext
        logical_path = logical_path.include?(".#{default_ext}") ? logical_path : "#{logical_path}.#{default_ext}"
      end

      Rails.application.assets.spraycan_expire(logical_path)
      Rails.application.assets.spraycan_expire(absolute_path)
      Rails.application.assets.send(:trail).spraycan_expire(absolute_path, logical_path)

      key = Rails.application.assets.send :cache_key_for, logical_path
      Rails.application.assets.cache.send :delete_entry, key, {}

      key = Rails.application.assets.send :cache_key_for, absolute_path
      Rails.application.assets.cache.send :delete_entry, key, {}

      key = Rails.application.assets.send :cache_key_for, "#{absolute_path}:source"
      Rails.application.assets.cache.send :delete_entry, key, {}
    end

    #writes file to disk for sprockets to find.
    def sprockets_dump(root_path=nil)
      path = sprocket_dump_path(root_path)
      ::File.open(path, 'w') {|f| f.write(self.body) } 

      if self.is_a? Spraycan::Stylesheet
        expire_asset(path, self.name, 'css')
      elsif self.is_a? Spraycan::Javascript
        expire_asset(path, self.name, 'js')
      else
        expire_asset(path, self.name)
      end

    end
  end
end
