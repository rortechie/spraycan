Rails.application.routes.draw do
  match "/deface" => "view_overrides#deface"
  resources :view_overrides, :only => [:index, :create, :update, :destroy]
  resources :templates, :only => [:index]
  resources :stylesheets, :only => [:show, :create, :update, :destroy]
end
