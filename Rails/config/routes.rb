Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'sessions'
  }
  get "users", to: 'users#index', constraints: { format: /(json|html)/ }
  get "users/:id", to: 'users#show', constraints: { format: /(json|html)/ }
  get "session/csrf", to: "session#csrf"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home" #setting default page to home
  get "/home" => "pages#home"


  #creating the RESTful resources
  resources :clients
  resources :employees
  resources :cars
  #resources :services
  #resources :appointments
end
