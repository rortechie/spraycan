class CreateThemes < ActiveRecord::Migration
  def self.up
    create_table :spraycan_themes do |t|
      t.string :name
      t.string :guid
      t.boolean :active, :default => false
      t.integer :position, :default => 0
      t.timestamps
    end
    Spraycan::Theme.reset_column_information
    theme = Spraycan::Theme.create(:name => "Site Theme", :active => true)
  end

  def self.down
    drop_table :spraycan_themes
  end
end
