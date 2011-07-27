class StylesheetController < ApplicationController
 
  layout "admin"

  def index
    @stylesheet = Stylesheet.new
    @available_stylesheets = Stylesheet.find(:all)
  end

  def update
    @style = Stylesheet.find(params[:id])
    
      if @style.update_attributes(params[:style])
        redirect_to admin_path, :notice => 'Stylesheet was successfully updated.'
      else
        render :text => "Something went wrong!!!"
      end
  end

end
