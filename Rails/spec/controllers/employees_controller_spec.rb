# require 'spec_helper'
# require 'rails_helper' #needed to find the models

# RSpec.describe EmployeesController, :type => :controller do
#    include Devise::Test::ControllerHelpers

# describe "Employees API" do

#   describe "GET #index" do
#     it "returns a successful response" do
#       employee = FactoryGirl.create :employee
#       get :index 
#       expect(response).to have_http_status(:ok)
# 	end

# 	it "returns all employees" do
# 		#creating 5 employees and maing sure all are returned
#       FactoryGirl.create_list(:employee,5)
#       get :index
#       parsed_response = JSON.parse(response.body)
#       puts parsed_response
#       expect(parsed_response["data"].length).to eq(5)
# 	end
#   end

#   describe "GET #show" do
#     it "returns a successful response" do
#       employee = FactoryGirl.create :employee
#        get :index
#       parsed_response = JSON.parse(response.body)
#       id = parsed_response["data"][0]["id"]
#       get :show, id: id
#       expect(response).to have_http_status(:ok)
# 	end

# 	it "returns employee with correct attribute values" do
# 		#creating an employee and making sure attributes properly set
#       FactoryGirl.create :employee
#       get :index
#       parsed_response = JSON.parse(response.body)
#       id = parsed_response["data"][0]["id"]
#       get :show, id: id
#       parsed_response = JSON.parse(response.body)

#       attr = parsed_response["data"]["attributes"]; 
#       expect(attr["last_name"]).to eq("Radwan")
#       expect(attr["first_name"]).to eq("Nada")
#       expect(attr["email"]).to eq("hgt34@gmail.com")
#       expect(attr["phone_number"]).to eq("345-468-3444")
#       expect(attr["street_number"]).to eq(45)
#       expect(attr["street_name"]).to eq("Bank street")
#       expect(attr["city"]).to eq("Ottawa")
#       expect(attr["province"]).to eq("Ontario")
#       expect(attr["postal_code"]).to eq("H7H 5U5")
#       expect(attr["start_date"]).to eq("2013-10-22")
#       expect(attr["is_admin"]).to eq(true)
# 	end

# 	it "returns an error if the employee does not exist" do
#       get :show, id: 0
# 		  expect(response).to be_not_found

#       parsed_response = JSON.parse(response.body)
#       expect(parsed_response['error']).to eq("This employee does not exist")	 
#     end
#   end

#   describe "POST #create" do
#     it "creates a new employee with valid attributes" do
#       # post "/employees", FactoryGirl.attributes_for(:employee).to_json
#       payload = {"data"=>{"id"=>"1", "type"=>"employees", "attributes"=>{"last_name"=>"Radwan", "first_name"=>"Nada", "email"=>"hgt34@gmail.com", "phone_number"=>"345-468-3444", "street_number"=>45, "street_name"=>"Bank street", "city"=>"Ottawa", "province"=>"Ontario", "postal_code"=>"H7H 5U5", "is_admin"=>true, "start_date"=>"2013-10-22"}}} 
# 	  # Create an instance of the model
# 	  # @employee = FactoryGirl.build(:employee)

# 	  # # Create a serializer instance
# 	  # @serializer = EmployeeSerializer.new(@employee)

# 	  # # Create a serialization based on the configured adapter
# 	  # @serialization = ActiveModelSerializers::Adapter.create(@serializer)
#       post :create, payload
#       expect(response).to have_http_status(:created)

#       parsed_response = JSON.parse(response.body)
#       puts parsed_response
#       attr = parsed_response["data"]["attributes"]; 
#       expect(attr["last_name"]).to eq("Radwan")
#       expect(attr["first_name"]).to eq("Nada")
#       expect(attr["email"]).to eq("hgt34@gmail.com")
#       expect(attr["phone_number"]).to eq("345-468-3444")
#       expect(attr["street_number"]).to eq(45)
#       expect(attr["street_name"]).to eq("Bank street")
#       expect(attr["city"]).to eq("Ottawa")
#       expect(attr["province"]).to eq("Ontario")
#       expect(attr["postal_code"]).to eq("H7H 5U5")
#       expect(attr["start_date"]).to eq("2013-10-22")
#       expect(attr["is_admin"]).to eq(true)
# 	end

# 	#need to add validation stuff to db
# 	# it "creates a new employee with invalid attributes" do
#  #      # post "/employees", FactoryGirl.attributes_for(:employee).to_json
#  #      payload = {"data"=>{"id"=>"1", "type"=>"employees", "attributes"=>{"last_name"=>"Radwan", "first_name"=>"Nada", "email"=>"hgt34@gmail.com", "phone_number"=>"345-468-3444", "street_number"=>"h", "street_name"=>"Bank street", "city"=>"Ottawa", "province"=>"Ontario", "postal_code"=>"H7H 5U5", "is_admin"=>"gg", "start_date"=>"2013-10-22"}}}
#  #      post "/employees",payload 
#  #      expect(response).to have_http_status(:created)

#  #      parsed_response = JSON.parse(response.body)
#  #      puts parsed_response
#  #      attr = parsed_response["data"]["attributes"]; 
#  #      expect(attr["last_name"]).to eq("Radwan")
#  #      expect(attr["first_name"]).to eq("Nada")
#  #      expect(attr["email"]).to eq("hgt34@gmail.com")
#  #      expect(attr["phone_number"]).to eq("345-468-3444")
#  #      expect(attr["street_number"]).to eq(45)
#  #      expect(attr["street_name"]).to eq("Bank street")
#  #      expect(attr["city"]).to eq("Ottawa")
#  #      expect(attr["province"]).to eq("Ontario")
#  #      expect(attr["postal_code"]).to eq("H7H 5U5")
#  #      expect(attr["start_date"]).to eq("2013-10-22")
#  #      expect(attr["is_admin"]).to eq(true)
# 	# end
#   end

#  #  describe "PUT #update" do
#  #    it "returns a successful response" do
#  #      employee = FactoryGirl.create :employee
#  #      get "/employees", format: :json
#  #      expect(response).to have_http_status(:ok)
# 	# end
#  #  end

#   #  describe "DESTROY #update" do
#  #    it "returns a successful response" do
#  #      employee = FactoryGirl.create :employee
#  #      get "/employees", format: :json
#  #      expect(response).to have_http_status(:ok)
# 	# end
#  #  end

# end
# end