require 'digest/md5'

module Sprockets
  class ActiveRecordStaticAsset < StaticAsset
    attr_reader :logical_path, :pathname
    attr_reader :content_type, :mtime, :length, :digest

    def initialize(environment, logical_path, pathname, active_record, digest = nil)
      @logical_path  = logical_path.to_s
      @pathname      = Pathname.new(pathname) #this is bs will always be public, but file doesn't exist!
      @content_type  = environment.content_type_of(pathname)
      @active_record = active_record

      @mtime  = active_record.updated_at.to_time
      @body   = active_record.body
      @length = body.bytesize
      @digest = digest || Digest::MD5.hexdigest(body)
    end

    def body
      @body
    end

    def stale?
      false #never refreshed this way
    end

    def to_path
      pathname.to_s
    end

    def to_s
      body
    end

  end
end
