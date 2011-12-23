class AddActiveToPalette < ActiveRecord::Migration
  def change
    add_column :spraycan_palettes, :active, :boolean, :default => false
  end
end
