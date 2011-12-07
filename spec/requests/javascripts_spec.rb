require 'spec_helper'

describe "Javascripts" do
  describe "managing", :js => true do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      @javascript = @theme.javascripts.create(:name => "first", :js => "alert('first');")
      load_theme(@theme)
    end

    it "should list javascripts" do
      click_link 'JS'
      click_link 'Load Javascript'

      page.should have_content("Test Theme » Javascript")
      find("tr[data-id='#{@javascript.id}']").should  have_link "Edit"
    end

    it "should show new/wip javascript" do
      click_link 'JS'
      click_link 'New Javascript'

      name = find_field('name').value

      click_link 'Close'

      page.should have_content("Test Theme » Javascript")

      within("tr[data-id='#{name.gsub('new_', '')}']") do
        page.should have_link('Discard')
      end

      within("tr[data-id='#{@javascript.id}']") do
        page.should have_link "Edit"
      end

      #confirm drop down shows recent
      click_link 'JS'
      within('ul.nav li#js') do
        page.should have_link "#{name} *"
      end
    end

    it "should discard new/wip javascript" do
      click_link 'JS'
      click_link 'New Javascript'

      name = find_field('name').value

      click_link 'Discard'

      page.should have_content("Test Theme » Javascript")

      page.should_not have_link('Discard')

      #confirm drop down does not shows dicarded
      click_link 'JS'
      within('ul.nav li#js') do
        page.should_not have_link "#{name} *"
      end

    end

    it "should create new javascript" do
      click_link 'JS'
      click_link 'New Javascript'

      page.should have_link('Discard')

      fill_in 'name', :with => 'second.js'

      page.execute_script %q{Spraycan.view.code_editor.getSession().setValue('alert("second");');}
      click_button "Save Changes"

      page.should have_link('Delete')

      sleep(1) #otherwise ajax is not completed?
      @theme.javascripts.where(:name => 'second.js').count.should == 1
    end

    describe "delete javascript" do
      before do
        click_link 'JS'
        click_link 'Load Javascript'

        within("tr[data-id='#{@javascript.id}']") do
          click_link 'Delete'
        end

        sleep(1)
        page.should have_content('Confirm Delete')
      end

      it "should remove javascript when confirmed" do
        within("div#confirm-delete") do
          click_link 'Delete'
        end

        sleep(1)
        page.should_not have_selector("tr[data-id='#{@javascript.id}']")

        lambda{ @javascript.reload }.should raise_error(ActiveRecord::RecordNotFound)
      end

      it "should NOT remove javascript when cancelled" do
        within("div#confirm-delete") do
          click_link 'Cancel'
        end

        sleep(1)
        page.should have_selector("tr[data-id='#{@javascript.id}']")

        lambda{ @javascript.reload }.should_not raise_error(ActiveRecord::RecordNotFound)
      end
    end

  end

end
