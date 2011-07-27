class AdminsController < ApplicationController

  before_filter :authenticate_admin!
  layout "admin"
  
  def index    
    @admins = Admin.find(:all)
  end

  def new
    @admin = Admin.new
  end
  
  def edit
    @admin = Admin.find(params[:id])
  end

  def create
    @admin = Admin.new(params[:admin])    
      if @admin.save
        redirect_to admins_path, :notice => 'Advice was successfully created.'
      else
        render :action => "new"        
      end    
  end

  def update
    @admin = Admin.find(params[:id])    
      if @admin.update_attributes(params[:admin])
        redirect_to admins_path, :notice => 'Advice was successfully updated.'
      else
        render :action => "edit"        
      end    
  end

  def destroy
    @admin = Admin.find(params[:id])
    @admin.destroy
    redirect_to admins_path
  end
  

end
