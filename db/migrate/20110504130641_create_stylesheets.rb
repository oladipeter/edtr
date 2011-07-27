class CreateStylesheets < ActiveRecord::Migration
  def self.up
    create_table :stylesheets do |t|
      t.string :name
      t.string :name_value
      t.integer :active, :default => "0"
    end

    # Insert stylesheets

    Stylesheet.create :name => "Default", :name_value => "default", :active => "1"
    Stylesheet.create :name => "MikroVoks", :name_value => "mikrovoks"
    Stylesheet.create :name => "MVmonitor", :name_value => "mvmonitor"
    Stylesheet.create :name => "Digirat", :name_value => "digirat"
    Stylesheet.create :name => "MikroKam", :name_value => "mikrokam"
    Stylesheet.create :name => "EDtR", :name_value => "edtr"
    Stylesheet.create :name => "seQUEnce", :name_value => "sequence"
    Stylesheet.create :name => "Onkormanyzati TV", :name_value => "onkormanyzatitv"

  end

  def self.down
    drop_table :stylesheets
  end
end
