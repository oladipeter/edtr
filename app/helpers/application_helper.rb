module ApplicationHelper

  def stylesheets
    @stylesheets = Stylesheet.where(:active => 1)        
  end

end