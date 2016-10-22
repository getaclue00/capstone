require 'spec_helper'
require 'rails_helper' #needed to find the models
# spec/requests/employees_spec.rb
# describe "Employees API" do
#   describe "GET /employees" do
#     it "returns all the employees" do
#       FactoryGirl.create :employee, first_name: "Omar"
#       FactoryGirl.create :employee, first_name: "Jana"

#       #get method takes three arguments: a path, a set of HTTP parameters, and any additional headers
#       #to be included in the request. In the case here, we aren’t sending any parameters with our request.
#       #We do, however, need to specify the Accept header to indicate that we want JSON back from the server.
#       get "/employees", {}, { "Accept" => "application/json" }

#       expect(response.status).to eq 200

#       body = JSON.parse(response.body)
#       puts body
#       employees = body.map { |m| m["first_name"] }

#       expect(employees).to match_array(["Omar",
#                                            "Jana"])
#     end
#   end
# end

describe "Employees API" do

  describe "GET #index" do
    it "returns a successful response" do
      employee = FactoryGirl.create :employee
      get "/employees", format: :json
      expect(response).to have_http_status(:ok)
	end

	it "returns all employees" do
		#creating 5 employees and maing sure all are returned
      FactoryGirl.create_list(:employee,5)
      get "/employees", format: :json
      parsed_response = JSON.parse(response.body)
      puts parsed_response
      expect(parsed_response["data"].length).to eq(5)
	end
  end

  describe "GET #show" do
    it "returns a successful response" do
      employee = FactoryGirl.create :employee
      get "/employees", format: :json
      expect(response).to have_http_status(:ok)
	end

	it "returns employee with correct attribute values" do
		#creating an employee and making sure attributes properly set
      FactoryGirl.create(:employee)
      get "/employees/1", format: :json
      parsed_response = JSON.parse(response.body)
      puts parsed_response
      attr = parsed_response["data"]["attributes"]; 
      expect(attr["last_name"]).to eq("Radwan")
      expect(attr["first_name"]).to eq("Nada")
      expect(attr["email"]).to eq("hgt34@gmail.com")
      expect(attr["phone_number"]).to eq("345-468-3444")
      expect(attr["street_number"]).to eq(45)
      expect(attr["street_name"]).to eq("Bank street")
      expect(attr["city"]).to eq("Ottawa")
      expect(attr["province"]).to eq("Ontario")
      expect(attr["postal_code"]).to eq("H7H 5U5")
      expect(attr["start_date"]).to eq(2013-10-22)
      expect(attr["is_admin"]).to eq(true)
	end

	it "returns an error if the employee does not exist" do
  		get "/employees/1", format: :json
		expect(response).to be_not_found

      	parsed_response = JSON.parse(response.body)
      	expect(parsed_response['error']).to eq("This employee does not exist")	 
    end
  end

  describe "POST #create" do
    it "creates a new employee with valid attributes" do
      # post "/employees", FactoryGirl.attributes_for(:employee).to_json
      payload = {"data"=>{"id"=>"1", "type"=>"employees", "attributes"=>{"last_name"=>"Radwan", "first_name"=>"Nada", "email"=>"hgt34@gmail.com", "phone_number"=>"345-468-3444", "street_number"=>45, "street_name"=>"Bank street", "city"=>"Ottawa", "province"=>"Ontario", "postal_code"=>"H7H 5U5", "is_admin"=>true, "start_date"=>2013-10-22}}}
      post "/employees",payload 
      expect(response).to have_http_status(:created)

      parsed_response = JSON.parse(response.body)
      puts parsed_response
      attr = parsed_response["data"]["attributes"]; 
      expect(attr["last_name"]).to eq("Radwan")
      expect(attr["first_name"]).to eq("Nada")
      expect(attr["email"]).to eq("hgt34@gmail.com")
      expect(attr["phone_number"]).to eq("345-468-3444")
      expect(attr["street_number"]).to eq(45)
      expect(attr["street_name"]).to eq("Bank street")
      expect(attr["city"]).to eq("Ottawa")
      expect(attr["province"]).to eq("Ontario")
      expect(attr["postal_code"]).to eq("H7H 5U5")
      expect(attr["start_date"]).to eq(2013-10-22)
      expect(attr["is_admin"]).to eq(true)
	end

	# it "returns all employees" do
	# 	#creating 5 employees and maing sure all are returned
 #      FactoryGirl.create_list(:employee,5)
 #      get "/employees", format: :json
 #      parsed_response = JSON.parse(response.body)
 #      puts parsed_response
 #      expect(parsed_response["data"].length).to eq(5)
	# end
  end
end