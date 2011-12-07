require 'spec_helper'

describe "Files" do
  describe "managing", :js => true do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      load_theme(@theme)

      image_path = Rails.root.join('public', 'evil.png').to_s
      @file = @theme.files.new(:name => 'evil.png')
      @file.file = File.open(image_path)
      @file.save!
    end

    it "should list all files for loaded theme" do
      click_link 'Files'

      page.should have_link 'evil.png'
    end

    it "should create new file" do
      click_link 'Files'

      attach_file 'file', Rails.root.join('public', 'spree.png').to_s

      sleep(2) #give time for file upload / export

      page.should have_link 'spree.png'

      @theme.files.where(:name => 'spree.png').count.should == 1
    end

    it "should show file details" do
      click_link 'Files'

      click_link 'evil.png'

      page.should have_selector("img[src='/assets/evil.png']")
    end

    describe "delete file" do
      before do
        click_link 'Files'
        click_link 'evil.png'
        click_link 'Delete'

        sleep(1)
      end

      it "should remove file when confirmed" do
        within("div#confirm-delete") do
          click_link 'Delete'
        end

        sleep(1)
        page.should_not have_selector("dt[data-id='#{@file.id}']")

        lambda{ @file.reload }.should raise_error(ActiveRecord::RecordNotFound)
      end

      it "should NOT remove file when cancelled" do
        within("div#confirm-delete") do
          click_link 'Cancel'
        end

        sleep(1)
        page.should have_selector("dt[data-id='#{@file.id}']")

        lambda{ @file.reload }.should_not raise_error(ActiveRecord::RecordNotFound)
      end

  end

  end
end
