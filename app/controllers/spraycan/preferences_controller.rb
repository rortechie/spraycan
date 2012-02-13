class Spraycan::PreferencesController < Spraycan::BaseController
  respond_to :json

  def create
    params[:preference]['_json'].each do |param|
      config = param[:configuration].constantize
      config.send "#{param[:name]}=".to_sym, param[:value]
    end

    CompileSweeper.expire_compiled

    #not sure what to return here
    render :json => { :all => 'good' }.to_json
  end

end
