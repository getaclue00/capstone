Rails.application.routes.draw do
  scope '/api' do
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
  end

  # putting wildcard back
  get '*path' => redirect('/')
end
