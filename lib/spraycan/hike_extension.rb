require 'hike'

Hike::Index.class_eval do
  def spraycan_expire(absolute_path, logical_path)
    @stats.delete absolute_path
    @entries.delete absolute_path.gsub /\/?#{logical_path}\z/, ''
  end
end
