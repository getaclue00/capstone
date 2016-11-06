# require "rails_helper"

# RSpec.describe UsersController, :type => :controller do
#   include Devise::Test::ControllerHelpers

#   describe "GET users#index" do
#     context 'when filter is not present' do
#       it "responds with an HTTP 400 status code" do
#         get :index
#         expect(response).to have_http_status(400)
#       end

#       it "responds with an HTTP 400 status code with a different param is present" do
#         get :index, {:params => {:sort => 'title'}}
#         expect(response).to have_http_status(400)
#       end

#       it "responds successfully with an HTTP 200 status code" do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

#         get :index

#         expect(response).to be_success
#         expect(response).to have_http_status(200)
#       end

#       it "responds successfully with an HTTP 200 status code with a different param is present" do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

#         get :index, {:params => {:sort => 'title'}}

#         expect(response).to be_success
#         expect(response).to have_http_status(200)
#       end
#     end

#     context 'when filter is present' do
#       it "responds with an HTTP 400 status code" do
#         get :index, {:params => {:filter => {:user_type => ''}}}

#         expect(response).to have_http_status(400)
#       end

#       it "responds successfully with an HTTP 200 status code" do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

#         get :index, {:params => {:filter => {:user_type => ''}}}

#         expect(response).to be_success
#         expect(response).to have_http_status(200)
#       end

#       it "responds successfully with an HTTP 200 status code" do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})

#         get :index, {:params => {:filter => {:user_type => 'employee'}}}

#         expect(response).to be_success
#         expect(response).to have_http_status(200)

#         json = JSON.parse(response.body)

#         expect(json['data'].count).to eq(2)
#       end

#       it "responds successfully with an HTTP 200 status code" do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne'})

#         get :index, {:params => {:filter => {:user_type => 'employee'}}}

#         expect(response).to be_success
#         expect(response).to have_http_status(200)

#         json = JSON.parse(response.body)

#         expect(json['data'].count).to eq(2)
#       end
#     end

#     context 'when filter is present but is not acceptable' do
#       it "responds with an HTTP 400 status code " do
#         User.create({email: 'test@test.com', password: 'password', first_name: 'Tester', last_name: 'Testing', admin: true, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne', admin: false, employee: true})
#         User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne'})

#         get :index, {:params => {:filter => {:user_type => 'batman'}}}

#         expect(response).to have_http_status(400)

#         json = JSON.parse(response.body)
#         expect(json['error']).to eq("bad request")
#       end
#     end
#   end

#   describe "GET users#show" do
#     context 'when id param is present but no users' do
#       it 'responds correctly' do

#         get :show, params: { id: 1 }

#         # THIS IS TEMPORARY ==> WILL NEED TO REPACE WITH SERIALIZER

#         expect(response).to have_http_status(404)
#       end
#     end

#     context 'when id param is present with users' do
#       it 'responds correctly' do
#         user = User.create({email: 'batman@batman.com', password: 'password', first_name: 'Bruce', last_name: 'Wayne'})
#         user.save

#         get :show, params: { id: user.id }

#         # THIS IS TEMPORARY ==> WILL NEED TO REPACE WITH SERIALIZER
#         # saving/deleteing user seems not the way to go...

#         expect(response).to be_success
#         user.destroy
#       end
#     end
#   end
# end
