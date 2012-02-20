#need to stub out CompileDigest for now
module Spraycan
  class CompileDigest
    def self.update_stylesheet_digest(*args)
    end

    def self.update_javascript_digest(*args)

    end

  end
end

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
