require 'zlib'
require 'stringio'
require 'net/http'
require 'uri'

class Spraycan::Theme < ActiveRecord::Base
  has_many :view_overrides, :dependent => :destroy
  has_many :stylesheets, :dependent => :destroy
  has_many :javascripts, :dependent => :destroy
  has_many :graphics, :dependent => :destroy

  validates :name, :presence => true
  validates :guid, :presence => true, :uniqueness => true

  default_scope order('position')
  scope :active, where(:active => true)

  before_validation :set_guid
  before_save :check_name_change
  after_create :reset_asset_paths

  acts_as_list

  def sprockets_dump_root
    return @theme_dump_root if @theme_dump_root.present?

    dump_root = Rails.root.join "tmp/spraycan"
    Dir.mkdir(dump_root) unless File.exist?(dump_root)

    @theme_dump_root = dump_root.join(self.name.parameterize.underscore)
    Dir.mkdir(@theme_dump_root) unless File.exist?(@theme_dump_root)

    @theme_dump_root
  end

  def sprockets_dump_asset_directories
    return @sprockets_dump_asset_directories if @sprockets_dump_asset_directories.present?

    @sprockets_dump_asset_directories = []

    %w{stylesheets javascripts images}.each do |directory|
      Dir.mkdir(sprockets_dump_root.join(directory)) unless File.exist?(sprockets_dump_root.join(directory))
      @sprockets_dump_asset_directories << sprockets_dump_root.join(directory)
    end

    @sprockets_dump_asset_directories
  end


  def sprockets_dump
    self.stylesheets.each {|s| s.sprockets_dump(sprockets_dump_root) }
    self.javascripts.each {|j| j.sprockets_dump(sprockets_dump_root) }
    self.graphics.each {|g| g.sprockets_dump(sprockets_dump_root) }
  end

  def export
    self.to_json(:methods => [:source], :only => [:name, :guid])
  end

  def import_from_string(data)
    data = JSON.parse(data)
    data = data["theme"] if data.keys.include? "theme"

    if %w(guid name source).all? {|k| data.include? k}
      return false unless %w(view_overrides stylesheets files).all? {|k| data["source"].include? k}
    else
      return false
    end

    if Spraycan::Theme.exists?(:guid => data["guid"])
      Spraycan::TTheme.where(:guid => data["guid"])[0].destroy
    end

    self.name = data["name"]
    self.guid = data["guid"]

    if self.save
      data["source"]["view_overrides"].each { |override| self.view_overrides.create(override) }
      data["source"]["stylesheets"].each { |stylesheet| self.stylesheets.create(stylesheet) }

      data["source"]["files"].each do |file|
        s = StringIO.new(ActiveSupport::Base64.decode64(file["data"]))
        z = Zlib::GzipReader.new(s)

        temp_path = File.join([Rails.root, "tmp", file["file_name"]])
        File.open(temp_path, "w") {|f| f.write(z.read) }

        local_file = File.open(temp_path, "r")
        self.graphics.create(:file => local_file )
        local_file.close

      end

      true
    else
      false
    end
  rescue
    false
  end

  def source
    @source = {}
    @source[:view_overrides] = self.view_overrides.map { |s| s.attributes.reject { |key, val| ![:name, :virtual_path, :replace_with, :target, :selector, :closing_selector, :disabled, :replacement].include? key.to_sym } }
    @source[:stylesheets] = self.stylesheets.map { |s| s.attributes.reject { |key, val| ![:name, :css].include? key.to_sym } }
    @source[:files] = []

    self.graphics.each do |graphic|
      file = graphic.file.file
      next if file.nil?

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

    def check_name_change
      return if self.new_record?

      if self.changed.include? "name"
        #don't remove old version (it won't be included in asset paths anyway).
        self.sprockets_dump

        Rails.application.assets.send(:trail).paths.map! do |path|
          path.gsub File.join("tmp/spraycan", self.changes["name"].first, "/"), File.join("tmp/spraycan", self.name, "/")
        end

        Rails.application.assets.send(:expire_index!)
      end
    end

    def reset_asset_paths
      #remove all tmp/spraycan asset_paths
      Rails.application.assets.send(:trail).paths.reject!{ |path| path.include? "tmp/spraycan/" }

      #add active themes again - in correct sequence
      self.class.active.each do |theme|
        theme.sprockets_dump_asset_directories.each do |path|
          Rails.application.assets.send(:trail).paths.unshift path.to_s
        end
      end

      #force sprockets to dump it's cache
      Rails.application.assets.send(:expire_index!)
    end

end
