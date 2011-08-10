class AddSortToContent < ActiveRecord::Migration
  def self.up
    add_column :contents, :sort_number, :integer
  end

  def self.down
    remove_column :contents, :sort_number
  end
end
