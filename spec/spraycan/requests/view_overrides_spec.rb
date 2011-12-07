require 'spec_helper'

describe "View Overrides" do
  describe "managing", :js => true do
    before do
      @theme = Spraycan::Theme.create(:name => "Test Theme", :active => true)
      @view_override = @theme.view_overrides.create(
          :virtual_path => "products/show",
          :name         => "first",
          :replace_with => "text",
          :target       => "replace",
          :selector     => "h1",
          :replacement  => "<h1>This is nicer</h1>" )

      load_theme(@theme)
    end

    it "should list view_overrides" do
      click_link 'HTML'
      click_link 'Load View Override'

      page.should have_content("Test Theme » View Overrides")
      find("tr[data-id='#{@view_override.id}']").should  have_link "Edit"
    end

    it "should show new/wip view_override" do
      click_link 'HTML'
      click_link 'New View Override'

      sleep(1)

      name = find_field('name').value

      click_link 'Close'

      page.should have_content("Test Theme » View Overrides")

      within("tr[data-id='#{name.gsub('new_', '')}']") do
        page.should have_link('Discard')
      end

      within("tr[data-id='#{@view_override.id}']") do
        page.should have_link "Edit"
      end

      #confirm drop down shows recent
      click_link 'HTML'
      within('ul.nav li#html') do
        page.should have_link "#{name} *"
      end
    end

    it "should discard new/wip view_override" do
      click_link 'HTML'
      click_link 'New View Override'

      sleep(1)

      name = find_field('name').value

      click_link 'Discard'

      page.should have_content("Test Theme » View Overrides")

      page.should_not have_link('Discard')

      #confirm drop down does not shows dicarded
      click_link 'HTML'
      within('ul.nav li#html') do
        page.should_not have_link "#{name} *"
      end

    end

    it "should show advanced options" do
      click_link 'HTML'
      click_link 'New View Override'

      sleep(1)

      click_link 'Advanced'

      sleep(1)

      page.should have_selector "select[name='sequence']"
    end

    it "should show relevant replacement input when replace_with is changed" do
      click_link 'HTML'
      click_link 'New View Override'

      page.execute_script %q{Spraycan.view.code_editor.getSession().setValue('some value');}

      sleep(1)

      click_link 'Advanced'

      sleep(1)

      select "partial", :from => 'replace_with'
      page.should have_selector "input#replace_parital"

      select "template", :from => 'replace_with'
      page.should have_selector "input#replace_template"

      select "text", :from => 'replace_with'
      page.evaluate_script(%q{Spraycan.view.code_editor.getSession().getValue();}).should == 'some value';
    end

    it "should show attributes input when action is changed to set_attributes" do
      click_link 'HTML'
      click_link 'New View Override'

      select 'set_attributes', :from => 'target'

      sleep(1)

      page.should have_selector "textarea#replace_set_attibutes"
    end

    it "should create new view_override" do
      click_link 'HTML'
      click_link 'New View Override'

      sleep(1)

      page.should have_link('Discard')

      fill_in 'name', :with => 'some_new_override'

      page.execute_script %q{Spraycan.view.code_editor.getSession().setValue('alert("second");');}
      click_button "Save Changes"

      page.should have_link('Delete')

      @theme.view_overrides.where(:name => 'some_new_override').count.should == 1
    end

    describe "delete view_override" do
      before do
        click_link 'HTML'
        click_link 'Load View Override'

        within("tr[data-id='#{@view_override.id}']") do
          click_link 'Delete'
        end

        sleep(1)
        page.should have_content('Confirm Delete')
      end

      it "should remove view_override when confirmed" do
        within("div#confirm-delete") do
          click_link 'Delete'
        end

        sleep(1)
        page.should_not have_selector("tr[data-id='#{@view_override.id}']")

        lambda{ @view_override.reload }.should raise_error(ActiveRecord::RecordNotFound)
      end

      it "should NOT remove view_override when cancelled" do
        within("div#confirm-delete") do
          click_link 'Cancel'
        end

        sleep(1)
        page.should have_selector("tr[data-id='#{@view_override.id}']")

        lambda{ @view_override.reload }.should_not raise_error(ActiveRecord::RecordNotFound)
      end
    end

  end

end
