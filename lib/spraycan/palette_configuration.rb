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

  preference :favicon_file_name, :string, :default => ''

  preference :logo_file_name, :string, :default => '/assets/admin/bg/spree_50.png'
  preference :logo_alignment, :string, :default => 'left'

  ## BACKGROUND
  preference :background_file_name, :string, :default => ''
  preference :background_alignment, :string, :default => 'left top'
  preference :background_repeat,    :string, :default => 'repeat'

  ## FONTS
  preference :title_font, :string, :default => 'Irish Growler'
  preference :body_font,  :string, :default => 'Rock Salt'

  ## FONT SIZES ##
  # Store
  preference :store_name_font_size,      :integer, :default => 25
  preference :main_navigation_font_size, :integer, :default => 12
  preference :size_navigation_font_size, :integer, :default => 12

  # Product Listing
  preference :product_list_name_font_size,        :integer, :default => 12
  preference :product_list_description_font_size, :integer, :default => 12
  preference :product_list_price_font_size,       :integer, :default => 12

  # Product Details
  preference :product_detail_name_font_size,        :integer, :default => 12
  preference :product_detail_description_font_size, :integer, :default => 12
  preference :product_detail_price_font_size,       :integer, :default => 35
  preference :product_detail_variants_font_size,    :integer, :default => 12

  # Basic
  preference :heading_font_size,      :integer, :default => 12
  preference :sub_heading_font_size,  :integer, :default => 12
  preference :button_font_size,       :integer, :default => 12
  preference :input_box_font_size,    :integer, :default => 12

  ## DIGEST
  preference :stylesheet_digest, :string, :default => 'fresh'
  preference :javascript_digest, :string, :default => 'fresh'
end

Spraycan::Config = Spraycan::AppConfiguration.new
