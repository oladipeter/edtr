class StylesheetsController < ApplicationController
  # GET /stylesheets
  # GET /stylesheets.xml
  
  layout "admin"

  def index
    @stylesheets = Stylesheet.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @stylesheets }
    end
  end

  # GET /stylesheets/1
  # GET /stylesheets/1.xml
  def show
    @stylesheet = Stylesheet.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @stylesheet }
    end
  end

  # GET /stylesheets/new
  # GET /stylesheets/new.xml
  def new    
    @stylesheet = Stylesheet.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @stylesheet }
    end
  end

  # GET /stylesheets/1/edit
  def edit
    @stylesheet = Stylesheet.find(params[:id])
  end

  # POST /stylesheets
  # POST /stylesheets.xml
  def create
    @stylesheet = Stylesheet.new(params[:stylesheet])

    respond_to do |format|
      if @stylesheet.save
        format.html { redirect_to(@stylesheet, :notice => 'Stylesheet was successfully created.') }
        format.xml  { render :xml => @stylesheet, :status => :created, :location => @stylesheet }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @stylesheet.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /stylesheets/1
  # PUT /stylesheets/1.xml
  def update

    Stylesheet.update_all(:active => "0")

    @stylesheet = Stylesheet.find(params[:id])    
    @stylesheet.update_attributes(:active => "1")
    redirect_to stylesheets_path, :notice => 'Template modified!'

  end

  # DELETE /stylesheets/1
  # DELETE /stylesheets/1.xml
  def destroy
    @stylesheet = Stylesheet.find(params[:id])
    @stylesheet.destroy

    respond_to do |format|
      format.html { redirect_to(stylesheets_url) }
      format.xml  { head :ok }
    end
  end

  def modify
    Stylesheet.update_all(:active => "0")
    @stylesheet = Stylesheet.find(params[:id])
    @stylesheet.update_attributes(:active => "1")
  end


end
