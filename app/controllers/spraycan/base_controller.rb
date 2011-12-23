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
    # needs to be tweaked to only force recompile for single view method
    def clear_resolver_cache
      return unless Rails.env.production?
      Spraycan::Engine.initialize_themes
      @_lookup_context.view_paths.map(&:clear_cache)
    end
end
