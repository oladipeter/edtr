class AddInfoIdToTabs < ActiveRecord::Migration
  def self.up
    add_column :tabs, :info_id, :integer
  end

  def self.down
    remove_column :tabs, :info_id
  end
end
