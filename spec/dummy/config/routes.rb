Rails.application.routes.draw do
  root :to => 'products#index'

  resources :products

  mount Spraycan::Engine => "/spraycan"
end
