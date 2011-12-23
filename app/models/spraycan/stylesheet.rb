require "fileutils"

class Spraycan::Stylesheet < ActiveRecord::Base
  include Spraycan::SprocketsHelper

  belongs_to :theme

  def body
    self.css
  end

  def style_id
    self.name.gsub('/', '-').gsub('.css', '')
  end
end
