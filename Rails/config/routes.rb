Rails.application.routes.draw do
  scope '/api' do
    # constraints: lambda { |req| req.format == :json }
    post "users", to: "users#create"
    patch "/users/:id" => "users#update"

    devise_for :users, controllers: {
      sessions: 'sessions'
    }
    get "session/csrf", to: "session#csrf"

    #creating the RESTful resources
    resources :clients
    resources :employees
    resources :cars
    resources :services
    resources :appointments
    get "users", to: 'users#index'
    get "users/:id", to: 'users#show'
    delete "/users/:id" => "users#destroy"
  end

  # putting wildcard back
  get '*path' => redirect('/')
end
