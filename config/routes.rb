Spraycan::Engine.routes.draw do
  root :to => "view_overrides#spraycan"

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
end
