require 'spec_helper'

describe "Theme" do
  describe "export and import" do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      @guid = @theme.guid

      image_path = Rails.root.join('public', 'evil.png').to_s
      @file = @theme.files.new(:name => 'evil.png')
      @file.file = File.open(image_path)
      @file.save!

      @view_override = @theme.view_overrides.create(
          :virtual_path => "products/show",
          :name         => "first",
          :replace_with => "text",
          :target       => "replace",
          :selector     => "h1",
          :replacement  => "<h1>This is nicer</h1>" )

      @stylesheet = @theme.stylesheets.create(:name => "css_1", :css => ".first{color:red;}")
      @javascript = @theme.javascripts.create(:name => "js_2", :js => "alert('first');")
    end

    it "should export all assets" do
      parsed = JSON.parse(@theme.export)

      parsed['source']['files'].size.should == 1
      parsed['source']['files'][0]['file_name'].should == @file.name

      s = StringIO.new(ActiveSupport::Base64.decode64(parsed['source']['files'][0]['data']))
      z = Zlib::GzipReader.new(s)
      z.read.should == @file.file.read

      parsed['source']['view_overrides'].size.should == 1
      parsed['source']['view_overrides'][0]['name'].should == @view_override.name
      parsed['source']['view_overrides'][0]['virtual_path'].should == @view_override.virtual_path

      parsed['source']['stylesheets'].size.should == 1
      parsed['source']['stylesheets'][0]['name'].should == @stylesheet.name
      parsed['source']['stylesheets'][0]['css'].should == @stylesheet.css

      parsed['source']['javascripts'].size.should == 1
      parsed['source']['javascripts'][0]['name'].should == @javascript.name
      parsed['source']['javascripts'][0]['js'].should == @javascript.js
    end

    it "should import all assets" do
      export = @theme.export
      @theme.destroy

      lambda{ @theme.reload }.should raise_error(ActiveRecord::RecordNotFound)

      @theme = Spraycan::Theme.new
      @theme.import_from_string(export).should be_true

      @theme.name.should == "Test Theme"
      @theme.guid.should == @guid

      @theme.files.size.should == 1
      @theme.files[0].name.should == @file.name
      @theme.files[0].file.class.should == GraphicUploader

      @theme.javascripts.size.should == 1
      @theme.javascripts[0].name.should == @javascript.name
      @theme.javascripts[0].js.should == @javascript.js

      @theme.stylesheets.size.should == 1
      @theme.stylesheets[0].name.should == @stylesheet.name
      @theme.stylesheets[0].css.should == @stylesheet.css

      @theme.view_overrides.size.should == 1
      @theme.view_overrides[0].name.should == @view_override.name
      @theme.view_overrides[0].virtual_path.should == @view_override.virtual_path
    end

  end
end
