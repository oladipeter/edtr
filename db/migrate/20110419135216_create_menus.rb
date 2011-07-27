class CreateMenus < ActiveRecord::Migration
  def self.up
    create_table :menus do |t|
      t.string :title
      t.integer :content_id

      t.timestamps
    end

    # Insert default menu, content_id => 1, connect with content 1.
    Menu.create :title => "Default menu", :content_id => "1"

  end

  def self.down
    drop_table :menus
  end
end
