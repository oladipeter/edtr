class Admin < ActiveRecord::Base

  #Devise
  devise :database_authenticatable, :trackable, :timeoutable, :lockable
  
end
