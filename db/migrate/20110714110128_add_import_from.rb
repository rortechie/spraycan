class AddImportFrom < ActiveRecord::Migration
  def change
    add_column :themes, :imported_from, :string
    add_column :graphics, :name, :string
  end
end
