require 'hike'

Hike::Index.class_eval do
  def spraycan_expire(absolute_path, logical_path)
    @stats.clear #delete absolute_path
    @entries.clear #delete absolute_path.gsub /\/?#{logical_path}\z/, ''
  end
end

Hike::Trail.class_eval do
  def spraycan_expire(absolute_path, logical_path)
    #dummy method as Trail isn't cached
    #files are checked on every request
    # debugger
    # 1
  end
end
