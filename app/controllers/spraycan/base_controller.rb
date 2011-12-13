class Spraycan::BaseController < ActionController::Base
  before_filter :authenticate_spraycan

  private
    def authenticate_spraycan
      # unless Rails.env.development?
      #   raise ActionController::RoutingError.new('Spraycan is only enabled in development mode by default.')
      #   return false
      # end
    end

    # Clears all cached ActionView Templates, forcing re-compile
    def clear_resolver_cache
      return unless Rails.env.production?
      Spraycan::Engine.initialize_themes
      @_lookup_context.view_paths.map(&:clear_cache)
    end

    # Clears all cached static and bundled assets
    # def clear_sprockets_assets
    #   return unless Rails.env.production?
    #   Rails.application.assets.instance_eval { @assets = {} }
    # end
end
