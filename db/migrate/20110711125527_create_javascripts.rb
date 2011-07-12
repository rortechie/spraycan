class CreateJavascripts < ActiveRecord::Migration
  def change
    create_table :javascripts do |t|
      t.string :name
      t.text :js
      t.integer :theme_id
      t.timestamps
    end

    Javascript.reset_column_information

    Javascript.create(:name => "application", :js => "", :theme => Theme.active.first)
  end
end
