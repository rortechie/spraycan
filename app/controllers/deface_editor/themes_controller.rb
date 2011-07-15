class DefaceEditor::ThemesController < DefaceEditor::BaseController
  after_filter :clear_resolver_cache, :only => [:create, :update, :destroy]
  after_filter :clear_sprockets_assets, :only => [:create, :update, :destroy]

  respond_to :json

  def index
    @themes = DefaceEditor::Theme.all

    respond_with @themes
  end

  def create
    @theme = DefaceEditor::Theme.create params[:theme]

    respond_with @theme
  end

  def update
    @theme = DefaceEditor::Theme.where(:id => params.delete(:id)).first
    @theme.insert_at params[:theme][:position] if params[:theme].key? :position
    @theme.update_attributes params[:theme]

    respond_with @theme
  end

  def destroy
    render :js => DefaceEditor::Theme.destroy(params[:id]).to_s
  end

  def export
    @theme = DefaceEditor::Theme.find(params[:id])

    dump_path = File.join([Rails.root, "public", "#{@theme.guid}.json"])
    File.open(dump_path, 'w') {|f| f.write(@theme.export) }

    #redirect_to "/downloads/#{self.id}.json"
    send_file dump_path, :type => 'application/json'
  end

  def import
    @theme = DefaceEditor::Theme.new

    if @theme.import_from_string(params[:import].tempfile.read)
      render :js => "var theme_id = #{@theme.id};"
    else
      render :js => "var theme_id = null;"
    end
  end

end
