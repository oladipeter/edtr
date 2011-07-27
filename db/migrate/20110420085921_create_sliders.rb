class CreateSliders < ActiveRecord::Migration
  def self.up
    create_table :sliders do |t|
      t.string :title
      t.text :description

      t.timestamps
    end

    # Insert slides content, id => 1
    Slider.create :title => "Slide One", :description => "Slide 1 description"
    Slider.create :title => "Slide Two", :description => "Slide 2 description"
    Slider.create :title => "Slide Three", :description => "Slide 3 description"

  end

  def self.down
    drop_table :sliders
  end
end
