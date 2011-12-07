require 'spec_helper'

describe "View Overrides" do
  describe "managing", :js => true do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      load_theme(@theme)
    end

    it "should show inspector" do
      click_link 'HTML'
      click_link 'Show Inspector'

      page.should have_content('Inspector')
      page.should have_selector('pre#source')
    end

  end
end

