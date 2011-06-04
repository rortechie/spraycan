Rails.application.routes.draw do
  match "/deface" => "deface/view_overrides#deface"

  namespace :deface do
    resources :templates, :only => [:index]

    resources :themes do
      member do
        get :export
      end
      collection do
        post :import
      end
      resources :view_overrides, :only => [:index, :create, :update, :destroy]
      resources :stylesheets
      resources :graphics
    end
  end
end
