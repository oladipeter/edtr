class AddActiveFlagToTab < ActiveRecord::Migration
  def self.up
    add_column :tabs, :active, :boolean
  end

  def self.down
    remove_column :tabs, :active
  end
end
