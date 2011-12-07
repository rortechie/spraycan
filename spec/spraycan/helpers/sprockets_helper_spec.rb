require 'spec_helper'

module Spraycan
  describe SprocketsHelper do
    before(:each) do
      # dummy app has app/assets/styelsheet/products.css and app/assets/javascripts/products.js
      # but the mocked paths / sprockets env places the `Test Theme` dump_path as a higher priority
      # than the app/assets path so any file created in `Test Theme` should win over app/assets
      @assets = Sprockets::Environment.new
      @assets.append_path(Rails.root.join("tmp/spraycan/test_theme/stylesheets"))
      @assets.append_path(Rails.root.join("tmp/spraycan/test_theme/javascripts"))
      @assets.append_path(Rails.root.join("app/assets/stylesheets"))
      @assets.append_path(Rails.root.join("app/assets/javascripts"))
      @assets.cache = ActiveSupport::Cache::FileStore.new(Rails.root.join("tmp/cache/assets"))

      @config = Rails.application.config

      application = Struct.new(:config, :assets).new(@config, @assets.index)
      Rails.stub(:application => application)
    end

    it "should clear sprockets caches when asset is created" do
      %w{css js}.each do |type|
        before = Rails.application.assets["products.#{type}"].body.clone

        asset = case type
        when 'js'
          FactoryGirl.build(:javascript, :name => "products.#{type}", :js => (0...8).map{65.+(rand(25)).chr}.join)
        when 'css'
          FactoryGirl.build(:stylesheet, :name => "products.#{type}", :css => (0...8).map{65.+(rand(25)).chr}.join)
        end
        asset.save

        after = Rails.application.assets["products.#{type}"].body

        before.should_not == after

        #handle the weirdness sprockets processing
        #does to the asset bodys
        case type
        when 'js'
          after.strip.should == asset.body + "\n;"
        when 'css'
          after.strip.should == asset.body
        end
 
      end
    end

    after(:all) do
      FileUtils.rm_rf Rails.root.join("tmp/spraycan").to_s
    end
  end
end
