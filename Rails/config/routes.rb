Rails.application.routes.draw do
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
