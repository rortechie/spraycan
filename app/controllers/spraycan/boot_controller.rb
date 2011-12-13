class Spraycan::BootController < Spraycan::BaseController
  def editor

  end

  def tweaker
    render :action => "tweaker", :layout => false
  end
end
