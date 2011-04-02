class Deface::BaseController < ActionController::Base
  before_filter :authenticate_deface

  private
    def authenticate_deface
      unless Rails.env.development?
        raise ActionController::RoutingError.new('Not Found')
        return false
      end
    end
end
