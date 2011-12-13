class AddAppliesToTheme < ActiveRecord::Migration
  def change
    add_column :spraycan_themes, :applies_to, :string
  end
end
