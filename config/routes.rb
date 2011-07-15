Rails.application.routes.draw do
  match "/deface" => "deface_editor/view_overrides#deface"

  namespace :deface_editor do
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
      resources :javascripts
      resources :graphics
    end
  end
end
