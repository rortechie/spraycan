module Spraycan
  class CompileDigest
    def self.update_stylesheet_digest(palette=nil)
      palette ||= Palette.where(:active => true).first

      key = Theme.active.includes(:stylesheets).map{|t| t.stylesheets.map &:body }.join
      key << palette.preferences.merge(:palette_id => palette.id).to_s

      Spraycan::Config[:stylesheet_digest] = Digest::MD5.new.update(key).hexdigest
    end

    def self.update_javascript_digest
      key = Theme.active.includes(:javscripts).map{|t| t.javascripts.map &:body }

      Spraycan::Config[:javascript_digest] = Digest::MD5.new.update(key).hexdigest
    end
  end
end
