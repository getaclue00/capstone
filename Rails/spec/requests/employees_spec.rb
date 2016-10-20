require 'spec_helper'
require 'rails_helper' #needed to find the models
# spec/requests/employees_spec.rb
describe "Employees API" do
  describe "GET /employees" do
    it "returns all the employees" do
      FactoryGirl.create :employee, first_name: "Omar"
      FactoryGirl.create :employee, first_name: "Jana"

      #get method takes three arguments: a path, a set of HTTP parameters, and any additional headers
      #to be included in the request. In the case here, we aren’t sending any parameters with our request.
      #We do, however, need to specify the Accept header to indicate that we want JSON back from the server.
      get "/employees", {}, { "Accept" => "application/json" }

      expect(response.status).to eq 200

      body = JSON.parse(response.body)
      employees = body.map { |m| m["first_name"] }

      expect(employees).to match_array(["Omar",
                                           "Jana"])
    end
  end
end