class Deface::ThemesController < ActionController::Base
  def export
    @export = {}
    @export[:view_overrides] = ViewOverride.all
    @export[:stylesheets] = Stylesheet.all

    render :json => @export.to_json
  end

  def import

  end
end
