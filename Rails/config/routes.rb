require_dependency 'api_constraint'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post "users", to: "users#create", constraints: ApiConstraint.new
  patch "/users/:id" => "users#update", constraints: ApiConstraint.new

  devise_for :users, controllers: {
    sessions: 'sessions'
  }, skip: [:registrations, :passwords]

  resources :clients
  resources :employees, constraints: ApiConstraint.new
  resources :cars
  resources :services, constraints: ApiConstraint.new
  resources :appointments, constraints: ApiConstraint.new

  get "users", to: 'users#index', constraints: ApiConstraint.new
  get "users/:id", to: 'users#show', constraints: ApiConstraint.new
  delete "/users/:id" => "users#destroy", constraints: ApiConstraint.new
end
