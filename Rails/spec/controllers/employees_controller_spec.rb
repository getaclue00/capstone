require 'spec_helper'
require 'rails_helper'

RSpec.describe EmployeesController, :type => :controller do
   include Devise::Test::ControllerHelpers

  describe 'GET Employees#index' do
    context 'when there are no employees' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No employees exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when there are employees' do
      it "returns with a successful response and the employees" do
        FactoryGirl.create_list(:employee_with_appointment, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET Employees#show' do
    context 'when there are no employees by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This employee does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the employee exists' do
      it 'returns the employee data' do
        employee = FactoryGirl.create :employee_with_appointment
        appointment_id = employee.appointments[0].id

        get :show, params: { id: employee.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(employee.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"];
        
        expect(attr["last_name"]).to eq("Radwan")
        expect(attr["first_name"]).to eq("Nada")
        expect(attr["phone_number"]).to eq("345-468-3444")
        expect(attr["street_number"].to_i).to eq(45)
        expect(attr["street_name"]).to eq("Bank street")
        expect(attr["city"]).to eq("Ottawa")
        expect(attr["province"]).to eq("Ontario")
        expect(attr["postal_code"]).to eq("H7H 5U5")
        expect(attr["start_date"]).to eq("2013-10-22")
        expect(attr["end_date"]).to eq("2015-11-19")
        expect(attr["is_admin"]).to eq(true)
        expect(attr["notes"]).to eq("This is a note")
        #VERIFYING EMPLOYEE POINTS TO OBJECTS
        expect(result["data"]["relationships"]["appointments"]["data"][0]["id"].to_i).to eq(appointment_id)
        #VERIFYING THAT OBJECTS POINT TO EMPLOYEE
        expect(Appointment.find(appointment_id).employee.id).to eq (employee.id)
      end
    end
  end

  describe "POST Employees#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Employee creation failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there and is correct' do
      it 'returns a successful response' do
        data = {
          "data": {
              "attributes": {
                "last_name": "Radwan",
                "first_name": "Nada",
                "email": "test@test.com", #appended n to make it unique
                "phone_number": "345-468-3444",
                "street_number": 45,
                "street_name": "Bank street",
                "city": "Ottawa",
                "province": "Ontario",
                "postal_code": "H7H 5U5",
                "start_date": "2013-10-22",
                "end_date": "2015-11-19",
                "is_admin": true,
                "notes": "This is a note"
              },
              "type":"services"
              }
      
            }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        expect(response).to have_http_status(:created)
      end
    end

    context 'when the data is there but not correct' do
      it 'returns a bad response' do
        data = {
          "data": {
              "attributes": {
                #name is mandatory
                "last_name": "Radwan",
                "first_name": "Nada",
                "email": "test@test.com", #appended n to make it unique
                "phone_number": "3459",
                "street_number": "tt",
                "street_name": "Bank street",
                "city": "Ottawa",
                "province": "Ontario",
                "postal_code": "H75",
                "start_date": "2013",
                "end_date": "aa",
                "is_admin": "ee",
                "notes": "This is a note"
              },
              "type":"services"
              }
      
            }
        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:bad_request)
        expect(result['error']).to eq('Employee creation failed. Check your data.')
        
      end
    end
   end

  describe 'PATCH Employee#update' do
    context 'when no such employee exists' do
      it 'returns an error' do

        employee = FactoryGirl.create :employee_with_appointment
        employee.last_name = "Testing Update of a non existent employee"

        # Create a serializer instance
        serializer = EmployeeSerializer.new(employee)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such employee exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the employee exists and the update had no params sent' do
      it "responds with a bad request" do
        employee = FactoryGirl.create :employee_with_appointment

        patch :update, params: { id: employee.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Employee update failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the employee exists and the correct params were sent' do
      it "responds successfully" do
        employee = FactoryGirl.create :employee_with_appointment
        employee.last_name = "testing"
        employee.first_name = "test"
        employee.email = "test@yahoo.com"
        employee.phone_number = "000-000-0000"
        employee.street_number = 45
        employee.street_name = "Albert Street"
        employee.city = "Ottawa"
        employee.province = "Ontario"
        employee.postal_code = "J2J 9Q9"
        employee.start_date = "2058-12-12"
        employee.end_date = "2060-11-11"
        employee.is_admin = false
        employee.notes = "test note"

        # Create a serializer instance
        serializer = EmployeeSerializer.new(employee)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: employee.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['data']['id'].to_i).to eq(employee.id)
        attr = parsed_response['data']['attributes']      
        expect(attr["last_name"]).to eq(employee.last_name)
        expect(attr["first_name"]).to eq(employee.first_name)
        expect(attr["phone_number"]).to eq(employee.phone_number)
        expect(attr["street_number"].to_i).to eq(employee.street_number)
        expect(attr["street_name"]).to eq(employee.street_name)
        expect(attr["city"]).to eq(employee.city)
        expect(attr["province"]).to eq(employee.province)
        expect(attr["postal_code"]).to eq(employee.postal_code)
        expect(attr["start_date"]).to eq("2058-12-12")
        expect(attr["end_date"]).to eq("2060-11-11")
        expect(attr["is_admin"]).to eq(employee.is_admin)
        expect(attr["notes"]).to eq(employee.notes)

        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the employee exists and the incorrect params were sent' do
      it "responds successfully" do
        employee = FactoryGirl.create :employee_with_appointment
        employee.last_name = "testing"
        employee.first_name = "test"
        employee.email = "test@yahoo.com"
        employee.phone_number = "000"
        employee.street_number = "pp"
        employee.street_name = "Albert Street"
        employee.city = "Ottawa"
        employee.province = "Ontario"
        employee.postal_code = "J2"
        employee.start_date = "jj"
        employee.end_date = "kk"
        employee.is_admin = "hh"
        employee.notes = "test note"

        # Create a serializer instance
        serializer = EmployeeSerializer.new(employee)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: employee.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq("Employee update failed. Check your data.")

        expect(response).to have_http_status(:bad_request)
      end
    end

  end

  describe 'DELETE Employees#destroy' do
    context 'when there are no employees by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 999 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such employee exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the employee exists and has no appointments' do
      it 'should delete it' do
        employee = FactoryGirl.create :employee

        delete :destroy, params: { id: employee.id }

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the employee exists and has appointments' do
      it 'should delete it' do
        FactoryGirl.create :employee, :id => 0 #needed for FK constraints when handling associated appointments
        employee = FactoryGirl.create :employee_with_appointment
        appt_id = employee.appointments[0].id

        delete :destroy, params: { id: employee.id }

        expect(response).to have_http_status(:no_content)
        #validate that associated appointments service id set to 0
        expect(Appointment.find(appt_id).employee_id).to eq (0)
      end
    end
  end
end
