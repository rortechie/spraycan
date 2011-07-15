require 'zlib'
require 'stringio'
require 'net/http'
require 'uri'

class DefaceEditor::Theme < ActiveRecord::Base
  has_many :view_overrides, :dependent => :destroy
  has_many :stylesheets, :dependent => :destroy
  has_many :javascripts, :dependent => :destroy
  has_many :graphics, :dependent => :destroy

  validates :name, :presence => true
  validates :guid, :presence => true, :uniqueness => true

  default_scope order('position')
  scope :active, where(:active => true)

  before_validation :set_guid

  acts_as_list

  def asset_path
    Rails.root.join("app", "theme_assets", self.guid)
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

    if DefaceEditor::Theme.exists?(:guid => data["guid"])
      DefaceEditor::TTheme.where(:guid => data["guid"])[0].destroy
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

end
