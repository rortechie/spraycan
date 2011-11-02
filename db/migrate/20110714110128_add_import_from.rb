class AddImportFrom < ActiveRecord::Migration
  def change
    add_column :spraycan_themes, :imported_from, :string
    add_column :spraycan_graphics, :name, :string
  end
end
