class CreateViewOverrides < ActiveRecord::Migration
  def self.up
    create_table :spraycan_view_overrides do |t|
      t.references :theme
      t.string :virtual_path
      t.string :name
      t.string :replace_with
      t.string :target
      t.string :selector
      t.string :closing_selector
      t.boolean :disabled
      t.text :replacement

      t.timestamps
    end
  end

  def self.down
    drop_table :spraycan_view_overrides
  end
end
