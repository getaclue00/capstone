Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # rake routes gives us 2 same routes for POST /users
  # When you run tests, you explicitly call the #create method of the UsersController, but when you send a 
  # real request, it actually routes to devise/registrations#create. 
  # we still need the Devise routes, since without them the sign_in method doesn't work. 
  # To get the UsersController to be called upon sign up, set devise_for :users after the usersController namespace 
  # The /users path should be handle by the api and not by devise. The routes file matches the first route when the server is asked to serve.
  post "users", to: "users#create", constraints: { format: /(json)/ }
  patch "/users/:id" => "users#update", constraints: { format: /(json)/ }


  devise_for :users, controllers: {
    sessions: 'sessions'
  }
  get "session/csrf", to: "session#csrf", constraints: { format: /(json)/ }

  #creating the RESTful resources
  resources :clients, constraints: { format: /(json)/ }
  resources :employees, constraints: { format: /(json)/ }
  resources :cars, constraints: { format: /(json)/ }
  resources :services, constraints: { format: /(json)/ }
  resources :appointments, constraints: { format: /(json)/ }
  get "users", to: 'users#index', constraints: { format: /(json)/ }
  get "users/:id", to: 'users#show', constraints: { format: /(json)/ }
  delete "/users/:id" => "users#destroy", constraints: { format: /(json)/ }


end
