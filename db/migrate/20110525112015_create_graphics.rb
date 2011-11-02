class CreateGraphics < ActiveRecord::Migration
  def self.up
    create_table :spraycan_graphics do |t|
      t.string :file
      t.references :theme
      t.timestamps
    end
  end

  def self.down
    drop_table :spraycan_graphics
  end
end
