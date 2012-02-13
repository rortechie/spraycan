class Spraycan::BaseController < ActionController::Base
  before_filter :authenticate_spraycan

  private
    def authenticate_spraycan
      # unless Rails.env.development?
      #   raise ActionController::RoutingError.new('Spraycan is only enabled in development mode by default.')
      #   return false
      # end
    end

    def initialize_themes
      return unless Rails.env.production?
      Spraycan::Engine.initialize_themes
      # @_lookup_context.view_paths.map(&:clear_cache)
    end
end
