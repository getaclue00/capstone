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
  resources :services, constraints: ApiConstraint.new
  resources :appointments, constraints: ApiConstraint.new
  resources :company_preferences, only: [:index, :show, :update], constraints: ApiConstraint.new

  get "users", to: 'users#index', constraints: ApiConstraint.new
  get "users/:id", to: 'users#show', constraints: ApiConstraint.new
  delete "/users/:id" => "users#destroy", constraints: ApiConstraint.new

  # catch-all route for any errors
  get "*path", to: "application#catch_all_404", via: :all
end
