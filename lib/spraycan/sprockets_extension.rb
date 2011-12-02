require 'sprockets'

Sprockets::Index.class_eval do
  def spraycan_expire(path)
    @assets.delete path
  end
end
