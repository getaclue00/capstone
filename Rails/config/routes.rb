Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "pages#home" #setting default page to home
  get "/home" => "pages#home"
  #post "/clients/" => "clients#create"
  #get "/clients/:id/edit" => "clients#edit"
  #patch "/clients/:id" =>"clients#update"

  #creating the RESTful resources
  resources :clients
end
