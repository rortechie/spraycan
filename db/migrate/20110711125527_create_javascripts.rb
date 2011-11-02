class CreateJavascripts < ActiveRecord::Migration
  def change
    create_table :spraycan_javascripts do |t|
      t.string :name
      t.text :js
      t.integer :theme_id
      t.timestamps
    end

    Spraycan::Javascript.reset_column_information

    Spraycan::Javascript.create(:name => "application", :js => "", :theme => Spraycan::Theme.active.first)
  end
end
