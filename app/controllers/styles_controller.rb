class StylesController < ApplicationController
  
  def index    
    @styles = Styles.find(:all)
  end

  def new
    @styles = Styles.new
  end

  def update
    @style = Styles.find(params[:id])

      if @style.update_attributes(params[:style])
        redirect_to admin_path, :notice => 'Stylesheet was successfully updated.'
      else
        render :text => "Something went wrong!!!"
      end
  end

end
