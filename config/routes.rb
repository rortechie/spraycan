Rails.application.routes.draw do
  match "/deface" => "deface/view_overrides#deface"

  namespace :deface do
    resources :templates, :only => [:index]

    resources :themes do
      resources :view_overrides, :only => [:index, :create, :update, :destroy]
      resources :stylesheets
    end
  end
end
