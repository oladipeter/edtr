class TabsController < ApplicationController

  before_filter :authenticate_admin!
  layout 'admin'

  def index
    @content = Content.new
    @info = Info.new
    @tabs = Tab.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @tabs }
    end
  end

  # GET /tabs/1
  # GET /tabs/1.xml
  def show
    @tab = Tab.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @tab }
    end
  end

  # GET /tabs/new
  # GET /tabs/new.xml
  def new
    @tab = Tab.new
  end

  # GET /tabs/1/edit
  def edit
    @tab = Tab.find(params[:id])
  end

  # POST /tabs
  # POST /tabs.xml
  def create
    @tab = Tab.new(params[:tab])
      if @tab.save
        redirect_to tabs_path
      else
        render :action => "new"
      end
  end

  # PUT /tabs/1
  # PUT /tabs/1.xml
  def update
    @tab = Tab.find(params[:id])
      if @tab.update_attributes(params[:tab])
        redirect_to tabs_path, :notice => 'Tab was successfully updated.'
      else
        render :action => "edit"
      end
  end

  # DELETE /tabs/1
  # DELETE /tabs/1.xml
  def destroy
    @tab = Tab.find(params[:id])
    @tab.destroy

    respond_to do |format|
      format.html { redirect_to(tabs_url) }
      format.xml  { head :ok }
    end
  end
end
