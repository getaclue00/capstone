require_dependency 'api_constraint'

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # rake routes gives us 2 same routes for POST /users
  # When you run tests, you explicitly call the #create method of the UsersController, but when you send a
  # real request, it actually routes to devise/registrations#create.
  # we still need the Devise routes, since without them the sign_in method doesn't work.
  # To get the UsersController to be called upon sign up, set devise_for :users after the usersController namespace
  # The /users path should be handle by the api and not by devise. The routes file matches the first route when the server is asked to serve.
  post "users", to: "users#create"
  patch "/users/:id" => "users#update"

  devise_for :users, controllers: {
    sessions: 'sessions'
  }

  #creating the RESTful resources
  resources :clients
  resources :employees
  resources :cars
  resources :services, constraints: ApiConstraint.new
  resources :appointments
  get "users", to: 'users#index'
  get "users/:id", to: 'users#show'
  delete "/users/:id" => "users#destroy"
end
