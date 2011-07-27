class Content < ActiveRecord::Base
  has_one :menu
  has_one :info
  has_many :tabs, :through => :info

  # Ha azt szeretnenk hogy az url-ben szerpepljen a a tartlomnal megadott url erteke akkor ezt kell engedelyezni

  #def to_param
  #  url
  #end



end
