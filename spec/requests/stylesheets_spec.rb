require 'spec_helper'

describe "Stylesheets" do
  describe "managing", :js => true do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      @stylesheet = @theme.stylesheets.create(:name => "first", :css => ".first{color:red;}")
      load_theme(@theme)
    end

    it "should list stylesheets" do
      visit "/spraycan#stylesheet?all"

      page.should have_content("Test Theme » Stylesheets")
      find("tr[data-id='#{@stylesheet.id}']").should  have_link "Edit"
    end

    it "should show new/wip stylesheet" do
      click_link 'CSS'
      click_link 'New Stylesheet'

      name = find_field('name').value

      click_link 'Close'

      page.should have_content("Test Theme » Stylesheets")

      within("tr[data-id='#{name.gsub('new_', '')}']") do
        page.should have_link('Discard')
      end

      within("tr[data-id='#{@stylesheet.id}']") do
        page.should have_link "Edit"
      end

      #confirm drop down shows recent
      click_link 'CSS'
      within('ul.nav li#css') do
        page.should have_link "#{name} *"
      end
    end

    it "should discard new/wip stylesheet" do
      click_link 'CSS'
      click_link 'New Stylesheet'

      name = find_field('name').value

      click_link 'Discard'

      page.should have_content("Test Theme » Stylesheets")

      page.should_not have_link('Discard')

      #confirm drop down does not shows dicarded
      click_link 'CSS'
      within('ul.nav li#css') do
        page.should_not have_link "#{name} *"
      end

    end

    it "should create new stylesheet" do
      click_link 'CSS'
      click_link 'New Stylesheet'

      page.should have_link('Discard')

      fill_in 'name', :with => 'second.css'

      page.execute_script %q{Spraycan.view.code_editor.getSession().setValue('.second{color:blue}');}
      click_button "Save Changes"

      page.should have_link('Delete')

      @theme.stylesheets.where(:name => 'second.css').count.should == 1
    end

    describe "delete stylesheet" do
      before do
        click_link 'CSS'
        click_link 'Load Stylesheet'

        within("tr[data-id='#{@stylesheet.id}']") do
          click_link 'Delete'
        end

        sleep(1)
        page.should have_content('Confirm Delete')
      end

      it "should remove stylesheet when confirmed" do
        within("div#confirm-delete") do
          click_link 'Delete'
        end

        sleep(1)
        page.should_not have_selector("tr[data-id='#{@stylesheet.id}']")

        lambda{ @stylesheet.reload }.should raise_error(ActiveRecord::RecordNotFound)
      end

      it "should NOT remove stylesheet when cancelled" do
        within("div#confirm-delete") do
          click_link 'Cancel'
        end

        sleep(1)
        page.should have_selector("tr[data-id='#{@stylesheet.id}']")

        lambda{ @stylesheet.reload }.should_not raise_error(ActiveRecord::RecordNotFound)
      end
    end

  end

end
