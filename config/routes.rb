Mikrokamnew::Application.routes.draw do  

  resources :infos

  devise_for :admins

  resources :admins
  resources :tabs
  resources :advices
  resources :sliders
  resources :menus
  resources :contents
  resources :tests
  resources :stylesheets

  scope "/admin" do
    resources :menus, :contents, :sliders, :tabs
  end  

  resources :home do
    member do
      get 'content'
      get 'advice'
      get 'slider'
      get 'active_tab_ajax'
      get 'all_active'
      get 'service'
    end
  end 

  get "home/index"
  
  match 'admin' => 'admins#index'
  match 'admins' => 'admins#index'

  match "infos/:id/show_tabs" => "infos#show_tabs", :as => "show_the_tabs"
  #match "home/:id/content" => "home#content", :as => "naming_url_content"
  
  # ADMIN  


  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "home#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  
end
