module Sprockets
  EnvironmentIndex.class_eval do
    include ActiveRecordHelper

    alias_method :sprockets_find_asset_in_path, :find_asset_in_path

    def find_asset_in_path(logical_path, options = {})
      pathname = logical_path

      if record = find_active_record_asset(pathname)
        asset = build_active_record_asset(logical_path, pathname, options, record)
       else
        asset = sprockets_find_asset_in_path(logical_path, options = {})
      end

      asset
    end

    def build_active_record_asset(logical_path, pathname, options, active_record)
      if asset = @assets[logical_path.to_s]
        return asset
      end

      if processors(content_type_of(pathname)).any?
        asset = ActiveRecordBundledAsset.new(self, logical_path, pathname, options, active_record)
      else
        asset = ActiveRecordStaticAsset.new(self, logical_path, pathname, active_record)
      end

      @assets[logical_path.to_s] = asset
    end

  end
end
