class HomeController < ApplicationController

  respond_to :html, :xml, :json
  before_filter :menu_object_init, :content_object_init, :show_all_slide, :advice_object_init, :tab_object_init, :stylesheet

  def stylesheet
    @stylesheet = Stylesheet.new    
    @stylesheets = Stylesheet.where(:active => 1)
  end

  def index
   redirect_to content_home_path(1)
   #@index_content = Content.find_by_id(1)
  end

  def show_all_slide
   @slider = Slider.new
   @slides = Slider.find(:all)
  end

  def advice_object_init
    @advice = Advice.new
    @advices = Advice.find(:all, :order => "updated_at DESC")
  end

  def menu_object_init #on the layout
    @menu = Menu.new
    @menus = Menu.find(:all, :order => "sort_number ASC") #where( :active => true )
  end

  def content_object_init #on the layout
    @content = Content.new
    @contents = Content.find(:all, :order => "sort_number ASC")
  end

  def tab_object_init #on the layout
    @tab = Tab.new
  end

  def content
    # Lehet hogy ide fog majd kelleni a throught, valamin kerresztül nézd meg!

    # megkapom a params [:id]- ban a megjeleno tartalom id-et => mondjuk : 2


    @content = Content.find(params[:id]) # megvan az adott tartalom
    @content_id = @content.id # megvan az adott tartalomhoz tartozo id -- 2

    # vegignezzuk az osszes info, ha van olyan info melynek a content_id-je megegyezik a @content_id-val
    # akkor kiiratjuk a hozza tartozo tabokat

    # Lehet, hogy az adott tartalomhoz nem tartozik info, meg kell vizsgalni

    @infos = Info.find(:all)

    @infos.each do |info|
      if @content_id == info.content_id # Ha letezik olyan info amihez van rendelve tartalom akkor | Ha 2 == 2
        @info_content_id = info.content.id # Az az info id ami a megjeleno tartalomhoz kapcsolodik | 3
        @info_main_id = info.id
        @info_name = info.name
      end
    end

    #@tabs = Tab.find_all_by_info_id(@info_main_id)
    @tabs = Tab.where("info_id = ? AND active = ?", @info_main_id, true)

    @container = "content" #Azert kell hogy a viewban tudjam hogy melyik fejlecet kell kiratnom

  end

  def advice
    @advice = Advice.find(params[:id])
    @container = "advice"
    @tabs = []
  end

  def slider
    @slider = Slider.find(params[:id])
    @container = "slider"
    @tabs = []
  end

  # AJAX REQUEST

  def active_tab_ajax
    @tab = Tab.find(6)
    respond_to do |format|
      format.js
    end

  end

  def all_active
    @all_tabs = Tab.find(:all)
    respond_to do |format|
      format.js
    end
  end

  def service
    @service_tab = Tab.find(params[:id])
    respond_to do |format|
      format.xml { render :xml => @service_tab }
    end
  end

end