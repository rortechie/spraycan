Spraycan::Engine.routes.draw do
  root :to => 'boot#editor'
  match '/toggle', :to => 'boot#toggle'

  match '/compiled.:action', :controller => :compiler

  resources :themes do
    member do
      get :export
    end
    collection do
      post :import
    end
    resources :view_overrides, :only => [:index, :create, :update, :destroy]
    resources :stylesheets
    resources :javascripts
    resources :files
  end

  resources :palettes
  resources :preferences, :only => [:create]
end
