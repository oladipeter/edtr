# encoding: UTF-8
class ContentsController < ApplicationController

  before_filter :authenticate_admin!
  layout 'admin'
  
  # GET /contents
  # GET /contents.xml
  def index
    @info = Info.new
    @info_contents = Info.all
    @contents = Content.find(:all, :order => "sort_number ASC")

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @contents }
    end
  end

  # GET /contents/1
  # GET /contents/1.xml
  def show
    @content = Content.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @content }
    end
  end

  # GET /contents/new
  # GET /contents/new.xml
  def new
    @content = Content.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @content }
    end
  end

  # GET /contents/1/edit
  def edit
    @content = Content.find(params[:id])
  end

  # POST /contents
  # POST /contents.xml
  def create
    @content = Content.new(params[:content])
    
      if @content.save
        redirect_to contents_path, :notice => 'Content was successfully created.'
      else
        render :action => "new"        
      end    
  end

  # PUT /contents/1
  # PUT /contents/1.xml
  def update
    @content = Content.find(params[:id])
    
      if @content.update_attributes(params[:content])
        redirect_to contents_path, :notice => 'Content was successfully updated.'
      else
        render :action => "edit"      
      end
    
  end

  # DELETE /contents/1
  # DELETE /contents/1.xml
  def destroy
    @content = Content.find(params[:id])
    if (params[:id] == '1')
      redirect_to contents_path, :notice => 'Ezt a tartalmat nem törölheted, de módosíthatod (id=1)'
    else
       #render :text => "#{params[:id]}"
      @content.destroy
      redirect_to contents_path, :notice => 'Sikeres törlés!'
    end
  end

end
