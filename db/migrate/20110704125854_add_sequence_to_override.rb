class AddSequenceToOverride < ActiveRecord::Migration
  def change
    add_column :view_overrides, :sequence, :string, :default => "before"
    add_column :view_overrides, :sequence_target, :string, :default => ""
  end
end
