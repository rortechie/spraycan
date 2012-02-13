module Spraycan
  class CompilerController < BaseController
    caches_page :css, :js

    def css
      @source = Theme.active.inject("") do |src, theme|
        src << theme.stylesheets.inject("") do |s, stylesheet|
          s << stylesheet.css 
        end
      end

      @template = Erubis::Eruby.new(@source)
      palette = Spraycan::Palette.where(:active => true).first

      render :text => @template.result(binding()), :content_type => "text/css"
    end

    def js
      @source = Theme.active.inject("") do |src, theme|
        src << theme.javascripts.inject("") do |s, javascript|
          s << javascript.css 
        end
      end

      @template = Erubis::Eruby.new(@source)
      palette = Spraycan::Palette.where(:active => true).first

      render :text => @template.result(binding()), :content_type => "text/js"
    end
  end
end
