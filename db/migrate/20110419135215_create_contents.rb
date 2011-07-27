class CreateContents < ActiveRecord::Migration
  def self.up
    create_table :contents do |t|
      t.string :title
      t.text :content
      t.timestamps
    end

    # Insert main content, id => 1
    Content.create :title => "Default content title", :content => "Here is the article"

  end

  def self.down
    drop_table :contents
  end
end
