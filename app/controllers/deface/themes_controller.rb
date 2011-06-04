include DefaceHelper

class Deface::ThemesController < ActionController::Base
  respond_to :json

  def index
    respond_with Theme.all
  end

  def create
    @theme = Theme.create pick(params, :name, :active)

    render :json => @theme.to_json
  end

  def update
    @theme = Theme.where(:id => params.delete(:id)).first
    @theme.insert_at params[:position] if params.key? :position
    @theme.update_attributes pick(params, :name, :active)

    respond_with @theme
  end

  def destroy
    Theme.destroy(params[:id])

    render :js => "true"
  end

  def export
    @theme = Theme.find(params[:id])

    dump_path = File.join([Rails.root, "public", "downloads", "#{@theme.guid}.json"])
    File.open(dump_path, 'w') {|f| f.write(@theme.export) }

    #redirect_to "/downloads/#{self.id}.json"
    send_file dump_path, :type => 'application/json'
  end

  def import
    @theme = Theme.new

    if @theme.import_from_string(params[:import].tempfile.read)
      render :js => "var theme_id = #{@theme.id};"
    else
      render :js => "var theme_id = null;"
    end
  end

end
