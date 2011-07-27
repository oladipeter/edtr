class DeviseCreateAdmins < ActiveRecord::Migration
  def self.up
    create_table(:admins) do |t|
      t.database_authenticatable
      t.lockable
      t.trackable
      t.timestamps
    end
    Admin.create :email => "oladi.peter@globomax.hu", :password => "va1Rooke"
  end

  def self.down
    drop_table :admins
  end
end
