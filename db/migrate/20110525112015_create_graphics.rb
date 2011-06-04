class CreateGraphics < ActiveRecord::Migration
  def self.up
    create_table :graphics do |t|
      t.string :file
      t.references :theme
      t.timestamps
    end
  end

  def self.down
    drop_table :graphics
  end
end
