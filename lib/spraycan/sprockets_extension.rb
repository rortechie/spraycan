require 'sprockets/base'

Sprockets::Base.class_eval do
  def spraycan_expire(logical_path)
    # @assets.keys.select {|k| k =~ /#{logical_path}\z/ }.each do |key|
    #   @assets.delete key
    # end

    if @assets.present?
      # debugger
    end
    @assets.clear

  end
end
