Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home" #setting default page to home
  get "/home" => "pages#home"

  # get "/employees/new" => "employees#new"
  # post "/employees/" => "employees#create"
  # get "/employees/:id/edit" => "employees#edit"
  # patch "/employees/:id" =>"employees#update"
  # get "/employees" => "employees#index"
  # get "/employees/:id" => "employees#show", as: :employee

  #creating the RESTful resources
  resources :clients
  resources :employees
  resources :cars
  #resources :services
  #resources :appointments
end
