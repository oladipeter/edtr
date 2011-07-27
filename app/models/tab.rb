class Tab < ActiveRecord::Base
  belongs_to :info
  has_one :content, :through => :info
end
