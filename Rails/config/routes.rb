Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'sessions'
  }
  get "session/csrf", to: "session#csrf"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  #creating the RESTful resources
  resources :clients
  resources :employees
  resources :cars
  resources :services
  resources :appointments

  resources :users, constraints: { format: /(json|html)/ }

  # Wild card for production
  get '*path' => redirect('/')
end
