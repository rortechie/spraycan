module Spraycan
  class Palette < ActiveRecord::Base
    preference :layout_background_color, :string, :default => '#ffffff'
    preference :title_text_color, :string, :default => '#000000'
    preference :body_text_color, :string, :default => '#000000'
    preference :link_text_color, :string, :default => '#000000'
    preference :product_background_color, :string, :default => '#ffffff'
    preference :product_title_text_color, :string, :default => '#000000'
    preference :product_body_text_color, :string, :default => '#000000'
    preference :product_link_text_color, :string, :default => '#000000'

    before_save :check_active
    after_save :set_digest

    private
      def check_active
        if self.changed.include?('active')
          Spraycan::Palette.update_all(:active => false)
        end
      end

      def set_digest
        return unless self.active?
        CompileDigest.update_stylesheet_digest(self)
      end
  end
end
