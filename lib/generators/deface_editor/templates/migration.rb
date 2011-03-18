class CreateViewOverrides < ActiveRecord::Migration
  def self.up
    create_table :view_overrides do |t|
      t.string :virtual_path
      t.string :name
      t.string :action
      t.string :replace_with
      t.string :target
      t.text :replacement

      t.timestamps
    end
  end

  def self.down
    drop_table :view_overrides
  end
end
