class Spraycan::FilesController < Spraycan::BaseController
  respond_to :json

  before_filter :set_theme, :only => [:index, :create]

  def index
    @files = @theme.files

    respond_with @files
  end

  def create
    file_path = Rails.root.join('tmp', params[:qqfile]).to_s
    File.open(file_path, 'wb'){|f| f.write request.raw_post }

    @file = @theme.files.where(:name =>  params[:qqfile].downcase).first
    @file ||= @theme.files.new(:name =>  params[:qqfile])

    @file.file = File.open(file_path)

    if @file.save
      if params.key? :preference
        Spraycan::Config.send "#{params[:preference]}=", @file.name
      end
      render :json => {:success => true, :filename => @file.name}
    else
      render :json => {:error => 'Failed to create file'}
    end
  end

  def update
    @file = Spraycan::File.where(:id => params.delete(:id)).first
    @file.update_attributes params[:file]

    respond_with @file
  end

  def destroy
    render :json => Spraycan::File.destroy(params[:id])
  end

  private
    def set_theme
      @theme = Spraycan::Theme.find(params[:theme_id])
    end

end

