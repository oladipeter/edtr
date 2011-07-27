class AddImageColumnToSlider < ActiveRecord::Migration
  def self.up
    add_column :sliders, :image_tag, :string
  end

  def self.down
    remove_column :sliders, :image_tag
  end
end
