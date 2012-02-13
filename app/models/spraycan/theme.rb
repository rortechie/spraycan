require 'zlib'
require 'stringio'
require 'net/http'
require 'uri'

module Spraycan
  class Theme < ActiveRecord::Base
    has_many :view_overrides, :dependent => :destroy
    has_many :stylesheets, :dependent => :destroy
    has_many :javascripts, :dependent => :destroy
    has_many :files, :dependent => :destroy

    validates :name, :presence => true
    validates :guid, :presence => true, :uniqueness => true

    default_scope order('position DESC')
    scope :active, where(:active => true)

    before_validation :set_guid

    acts_as_list

    after_save :set_digest

    def export
      self.to_json(:methods => [:source], :only => [:name, :guid, :applies_to])
    end

    def self.import_multiple_from_string(data)
      data = JSON.parse(data)

      data.each do |theme|
        self.import_from_json(theme)
      end
    end

    def self.import_from_string(data)
      self.import_from_json(JSON.parse(data))
    end

    def self.import_from_json(data)
      data = data["theme"] if data.keys.include? "theme"

      if %w(guid name source).all? {|k| data.include? k}
        return false unless %w(view_overrides stylesheets javascripts files).all? {|k| data["source"].include? k}
      else
        return false
      end

      if Spraycan::Theme.exists?(:guid => data["guid"])
        Spraycan::Theme.where(:guid => data["guid"])[0].destroy
      end

      theme = Spraycan::Theme.new

      theme.name = data["name"]
      theme.guid = data["guid"]
      theme.applies_to = data["applies_to"]

      if theme.save
        data["source"]["view_overrides"].each { |override| theme.view_overrides.create(override) }
        data["source"]["stylesheets"].each { |stylesheet| theme.stylesheets.create(stylesheet) }
        data["source"]["javascripts"].each { |javascript| theme.javascripts.create(javascript) }

        data["source"]["files"].each do |file|
          s = StringIO.new(ActiveSupport::Base64.decode64(file["data"]))
          z = Zlib::GzipReader.new(s)

          temp_path = File.join([Rails.root, "tmp", file["file_name"]])
          File.open(temp_path, "w") {|f| f.write(z.read) }

          local_file = File.open(temp_path, "r")
          theme.files.create(:file => local_file )
          local_file.close

        end

        true
      else
        false
      end
    rescue Exception => e
      false
    end

    def source
      @source = {}
      @source[:view_overrides] = self.view_overrides.map { |s| s.attributes.reject { |key, val| ![:name, :virtual_path, :replace_with, :target, :selector, :closing_selector, :disabled, :replacement].include? key.to_sym } }
      @source[:stylesheets] = self.stylesheets.map { |s| s.attributes.reject { |key, val| ![:name, :css].include? key.to_sym } }
      @source[:javascripts] = self.javascripts.map { |s| s.attributes.reject { |key, val| ![:name, :js].include? key.to_sym } }
      @source[:files] = []

      self.files.each do |file|
        file = file.file.file #meta huh? location location location!
        next if file.nil? || !file.exists?

        data = StringIO.new
        z = Zlib::GzipWriter.new(data)
        z.write file.read
        z.close

        @source[:files] << { :file_name => file.filename,
          :data => ActiveSupport::Base64.encode64(data.string) }
      end

      @source
    end

    private
      def set_guid
        self.guid ||= Guid.new.to_s
      end

      def set_digest
        CompileDigest.update_stylesheet_digest()
      end
  end
end
