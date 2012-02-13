class Spraycan::BootController < Spraycan::BaseController
  def editor
    #editor boot method
    if Spraycan::Theme.active.empty?
      if Spraycan::Theme.all.empty?
        Spraycan::Theme.create(:name => "Site Theme", :active => true)
      else
        Spraycan::Theme.first.update_attribute(:active, true)
      end
    end

    if session[:full]
      render :action => "editor", :layout => false
    else
      @themes = Spraycan::Theme.all
      @palettes = Spraycan::Palette.all
      render :action => "selector", :layout => false
    end
  end

  def toggle
    session[:full] = !session[:full]
    redirect_to root_url
  end

end
