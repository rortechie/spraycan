# module Spraycan
#   class ThemeLoader

#     def initialize(app)
#       @app = app
#     end

#     def call(env)
#       # if Spraycan::Theme.table_exists?
#       #   edit_paths = Rails.application.assets.send(:trail).paths.dup
#       #   edit_paths.reject!{ |path| path.include? "tmp/spraycan/" }

#       #   Spraycan::Theme.active.each do |theme|
#       #     theme.sprockets_dump_asset_directories.each do |path|
#       #       edit_paths.unshift path.to_s
#       #     end
#       #   end
#       # end

#       # Rails.application.assets.cache.clear

#       # Rails.application.assets.send(:trail).instance_eval { @paths = edit_paths }
#       # Rails.application.assets.spraycan_expire(nil)
#       # # Rails.application.assets.spraycan_expire(absolute_path)
#       # Rails.application.assets.send(:trail).spraycan_expire(nil, nil)

#       # Rails.application.assets.instance_eval do
#       #   # Clear digest to be recomputed
#       #   @digest = nil
#       #   @assets = {}
#       # end

#       # # Rails.application.assets.send :expire_index!
#       # puts y Rails.application.assets.paths




#       # @app.call(env)
#     end
#   end
# end
