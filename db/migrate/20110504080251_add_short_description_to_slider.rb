class AddShortDescriptionToSlider < ActiveRecord::Migration
  def self.up
    add_column :sliders, :short_description, :string
  end

  def self.down
    remove_column :sliders, :short_description
  end
end
