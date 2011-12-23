# Ugly hack until perferences is extracted to it's own gem
module Spree
  module Preferences

  end
end

require Spree::Core::Engine.root.join "app/models/spree/preferences/preferable"
require Spree::Core::Engine.root.join "app/models/spree/preferences/preferable_class_methods"
require Spree::Core::Engine.root.join "app/models/spree/preferences/configuration"
require Spree::Core::Engine.root.join "app/models/spree/preference"

class Spraycan::AppConfiguration < Spree::Preferences::Configuration
  preference :base_theme_id, :integer

  preference :logo_file_name, :string, :default => 'assets/admin/bg/spree_50.png'
  preference :background_file_name, :string, :default => ''

  preference :title_font, :string, :default => 'Irish Growler'
  preference :title_font_size, :integer, :default => 35
  preference :body_font, :string, :default => 'Rock Salt'
  preference :body_font_size, :integer, :default => 15
end

Spraycan::Config = Spraycan::AppConfiguration.new
