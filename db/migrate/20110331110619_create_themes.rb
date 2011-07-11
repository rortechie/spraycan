class CreateThemes < ActiveRecord::Migration
  def self.up
    create_table :themes do |t|
      t.string :name
      t.string :guid
      t.boolean :active, :default => false
      t.integer :position, :default => 0
      t.timestamps
    end
    Theme.reset_column_information
    theme = Theme.create(:name => "Site Theme", :active => true)

    add_column :view_overrides, :theme_id, :integer
    add_column :stylesheets, :theme_id, :integer

    ViewOverride.reset_column_information
    ViewOverride.update_all(:theme_id => theme.id)


    Stylesheet.reset_column_information
    Stylesheet.update_all(:theme_id => theme.id)
  end

  def self.down
    drop_table :themes

    remove_column :view_overrides, :theme_id
    remove_column :stylesheets, :theme_id
  end
end
