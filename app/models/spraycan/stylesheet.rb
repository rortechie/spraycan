require "fileutils"

module Spraycan
  class Stylesheet < ActiveRecord::Base
    belongs_to :theme

    after_save :set_digest

    def body
      self.css
    end

    def style_id
      self.name.gsub('/', '-').gsub('.css', '')
    end

    private

      def set_digest
        CompileDigest.update_stylesheet_digest()
      end
  end
end
