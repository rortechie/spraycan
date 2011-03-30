class CreateStylesheets < ActiveRecord::Migration
  def self.up
    create_table :stylesheets do |t|
      t.string :name
      t.text :css
      t.timestamps
    end

    Stylesheet.reset_column_information

    Stylesheet.create(:name => "application", :css => "body {}")
  end

  def self.down
    drop_table :stylesheets
  end
end
