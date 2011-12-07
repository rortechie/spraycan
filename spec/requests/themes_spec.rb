require 'spec_helper'

describe "Themes" do
  describe "managing", :js => true do
    before do
      @theme1 = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      @theme2 = Spraycan::Theme.create(:name => "Inactive Theme", :active => false)

      load_theme(@theme1)
    end

    it "should list all themes" do
      click_link 'Themes'

      find("tr[data-id='#{@theme1.id}']").should have_link "Edit"
      find("tr[data-id='#{@theme2.id}']").should have_content "No"
    end

    it "should show new/wip theme" do
      click_link 'Themes'
      click_link 'New Theme'

      sleep(1)

      name = find_field('name').value

      click_link 'Close'

      page.should have_content("Themes")

      within("tr[data-id='#{name.gsub('new_', '')}']") do
        page.should have_link('Discard')
      end

      within("tr[data-id='#{@theme1.id}']") do
        page.should have_link 'Edit'
      end

    end

    it "should discard new/wip theme" do
      click_link 'Themes'
      click_link 'New Theme'

      sleep(1)

      name = find_field('name').value

      click_link 'Discard'

      page.should have_content("Themes")

      page.should_not have_link('Discard')
    end

    it "should create new theme" do
      click_link 'Themes'
      click_link 'New Theme'

      sleep(1)

      page.should have_link('Discard')

      fill_in 'name', :with => 'Makeup on a pig'

      click_button "Save Changes"

      page.should have_link('Delete')

      Spraycan::Theme.where(:name => 'Makeup on a pig').count.should == 1
    end

    describe "delete theme" do
      before do
        click_link 'Themes'

        within("tr[data-id='#{@theme1.id}']") do
          click_link 'Delete'
        end

        sleep(1)
        page.should have_content('Confirm Delete')
      end

      it "should remove theme when confirmed" do
        within("div#confirm-delete") do
          click_link 'Delete'
        end

        sleep(1)
        page.should_not have_selector("tr[data-id='#{@theme1.id}']")

        lambda{ @theme1.reload }.should raise_error(ActiveRecord::RecordNotFound)
      end

      it "should NOT remove view_override when cancelled" do
        within("div#confirm-delete") do
          click_link 'Cancel'
        end

        sleep(1)
        page.should have_selector("tr[data-id='#{@theme1.id}']")

        lambda{ @theme1.reload }.should_not raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
