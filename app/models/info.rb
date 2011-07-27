class Info < ActiveRecord::Base
  belongs_to :content
  has_many :tabs
end
