class DefaceEditor::BaseController < ActionController::Base
  before_filter :authenticate_deface

  private
    def authenticate_deface
      unless Rails.env.development?
        raise ActionController::RoutingError.new('Not Found')
        return false
      end
    end

    # Clears all cached ActionView Templates, forcing re-compile
    def clear_resolver_cache
      return unless Rails.env.production?
      DefaceEditor::Engine.initialize_themes
      @_lookup_context.view_paths.map(&:clear_cache)
    end

    # Clears all cached static and bundled assets
    def clear_sprockets_assets
      return unless Rails.env.production?
      Rails.application.assets.instance_eval { @assets = {} }
    end
end
