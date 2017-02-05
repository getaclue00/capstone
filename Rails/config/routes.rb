Rails.application.routes.draw do
  scope '/api' do
    post "users", to: "users#create", constraints: lambda { |req| req.format == :json }
    patch "/users/:id" => "users#update", constraints: lambda { |req| req.format == :json }

    devise_for :users, controllers: {
      sessions: 'sessions'
    }
    get "session/csrf", to: "session#csrf", constraints: lambda { |req| req.format == :json }

    #creating the RESTful resources
    resources :clients, constraints: lambda { |req| req.format == :json }
    resources :employees, constraints: lambda { |req| req.format == :json }
    resources :cars, constraints: lambda { |req| req.format == :json }
    resources :services, constraints: lambda { |req| req.format == :json }
    resources :appointments, constraints: lambda { |req| req.format == :json }
    get "users", to: 'users#index', constraints: lambda { |req| req.format == :json }
    get "users/:id", to: 'users#show', constraints: lambda { |req| req.format == :json }
    delete "/users/:id" => "users#destroy", constraints: lambda { |req| req.format == :json }
  end

  # putting wildcard back
  get '*path' => redirect('/')
end
