class CreateStyles < ActiveRecord::Migration
  def self.up
    create_table :styles do |t|
      t.string :name
      t.string :name_value
      t.integer :active, :default => "0"
    end

    # Insert stylesheets

    Styles.create :name => "Default", :name_value => "default", :active => "1"
    Styles.create :name => "MikroVoks", :name_value => "mikrovoks"
    Styles.create :name => "MVmonitor", :name_value => "mvmonitor"
    Styles.create :name => "Digirat", :name_value => "digirat"
    Styles.create :name => "MikroKam", :name_value => "mikrokam"
    Styles.create :name => "EDtR", :name_value => "edtr"
    Styles.create :name => "seQUEnce", :name_value => "sequence"
    Styles.create :name => "Onkormanyzati TV", :name_value => "onkormanyzatitv"

  end

  def self.down
    drop_table :styles
  end
end
