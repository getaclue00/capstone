require 'spec_helper'
require 'rails_helper'

RSpec.describe AppointmentsController, :type => :controller do
  include Devise::Test::ControllerHelpers

  describe 'GET Appointments#index' do

    before :each do
      @user = FactoryGirl.create :user, email: 'test@test.com'
      controller.request.headers['Authorization'] = "Token token=\"#{@user.authentication_token}\", email=\"#{@user.email}\""
    end

    context 'when there are no appointments' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['data']).to be_empty
        expect(response).to have_http_status(200)
      end
    end

    context 'when different param and appointments are not present' do
      it "returns an error" do
        get :index, {:params => {:sort => 'title'}}

        result = JSON.parse(response.body)

        expect(result['data']).to be_empty
        expect(response).to have_http_status(200)
      end
    end

    context 'when there are appointments but no filter (user admin)' do
      it "returns with a successful response and the appointments" do
        FactoryGirl.create_list(:appointment, 5)
        get :index

        result = JSON.parse(response.body)

        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when there are appointments but no filter (user not admin)' do
      it "returns authorization failed" do
        @user.admin=false
        @user.save

        FactoryGirl.create_list(:appointment, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['error']).to eq('Not Authorized')
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when different param and appointments are present' do
      it "returns with a successful response and the services" do
        FactoryGirl.create_list(:appointment, 5)
        get :index, {:params => {:sort => 'title'}}
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when acceptable filter and appointments are not present' do
      it "returns success with no data" do
        get :index, {:params => {:filter => {:week => Time.now.strftime("%U").to_i, :year => Time.now.year}}}

        result = JSON.parse(response.body)

        expect(result['data']).to be_empty
        expect(response).to have_http_status(200)
      end
    end

    context 'when version requested and appointments are not present' do
      it "returns error", :versioning => true do
        get :index, {:params => {:version => {:id => 0}}}

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No such appointment exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when acceptable filter week+year and appointments are present (user admin)' do
      it "returns with a successful response and the appointments" do
        FactoryGirl.create_list(:appointment, 5)
        get :index, {:params => {:filter => {:week => '6', :year => '2006'}}}
        result = JSON.parse(response.body)
        expect(result['data']).to be_empty
        expect(response).to have_http_status(200)
      end
    end

    context 'when acceptable filter week+year and appointments are present (user not admin)' do
      it "returns with a successful response and the appointments" do
        @user.admin = false
        @user.save

        FactoryGirl.create_list(:appointment, 5)
        get :index, {:params => {:filter => {:week => '6', :year => '2006'}}}
        result = JSON.parse(response.body)
        expect(result['data']).to be_empty
        expect(response).to have_http_status(200)
      end
    end

    context 'when versions of an appointment is requested and appointment present and does not have versions' do
      it "returns with a successful response and empty array", :versioning => true do
        expect(PaperTrail).to be_enabled
        appointment = FactoryGirl.create :appointment

        get :index, {:params => {:version => {:id => appointment.id}}}
        result = JSON.parse(response.body)
        expect(result).to eq("data" => [])
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when versions of an appointment is requested and appointment present and has versions (user admin)' do
      it "returns with a successful response and the appointment's versions", :versioning => true do
        expect(PaperTrail).to be_enabled
        appointment = FactoryGirl.create :appointment
        appointment.update_attributes!(status: 'completed')

        get :index, {:params => {:version => {:id => appointment.id}}}
        result = JSON.parse(response.body)
        expect(result['appointments'][0]['status']).to eq('pending')
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when versions of an appointment is requested and appointment present and has versions (user not admin)' do
      it "returns authorization failed", :versioning => true do
        @user.admin=false
        @user.save

        expect(PaperTrail).to be_enabled
        appointment = FactoryGirl.create :appointment
        appointment.update_attributes!(status: 'completed')

        get :index, {:params => {:version => {:id => appointment.id}}}
        result = JSON.parse(response.body)
        expect(result['error']).to eq('Not Authorized')
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET Appointments#show' do
    context 'when there are no appointments by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No such appointment exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the appointment exists' do
      it 'returns the appointment data' do
        appointment = FactoryGirl.create :appointment
        client_id = appointment.client.id
        service_id = appointment.service.id
        employee_id = appointment.employee.id

        get :show, params: { id: appointment.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(appointment.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"]

        expect(attr["color"]).to eq("#AB00FF")
        expect(attr["text_color"]).to eq("#FFFFFF")
        expect(attr["title"]).to eq("New Appointment")
        expect(attr["week_number"]).to eq(Time.now.strftime("%U").to_i)
        expect(attr["notes"]).to eq("note")
        expect(attr["status"]).to eq("pending")
        #VERIFYING APPOINTMENT POINTS TO OBJECTS
        expect(result["data"]["relationships"]["client"]["data"]["id"].to_i).to eq(client_id)
        expect(result["data"]["relationships"]["service"]["data"]["id"].to_i).to eq(service_id)
        expect(result["data"]["relationships"]["employee"]["data"]["id"].to_i).to eq(employee_id)
        #VERIFYING THAT OBJECTS POINT TO APPOINTMENT
        expect(Client.find(client_id).appointments[0].id).to eq (appointment.id)
        expect(Service.find(service_id).appointments[0].id).to eq (appointment.id)
        expect(Employee.find(employee_id).appointments[0].id).to eq (appointment.id)
      end
    end
  end

  describe "POST Appointments#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Appointment creation failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end

   context 'when the data is there and is correct (without employee)' do
      it 'returns a succesful response' do
        service = FactoryGirl.create :service
        client = FactoryGirl.create :client
        FactoryGirl.create :employee, :id => 0 #needed for FK constraints when handling associated default employee
        data = {
          "data": {
            "type": "appointments",
            "attributes": {
                "color":"#AB00FF",
                "text_color":"#FFFFFF",
                "title":"New Appointment 123 5",
                "start":"2016-11-08T00:00:00.000Z",
                "end":"2016-11-08T00:00:00.000Z",
                "notes":"test note",
                "status":"pending"
            },
            "relationships": {
              "service":{"data":{"type":"services", "id": service.id}},
              "client":{"data":{"type":"clients", "id": client.id}}
              #default employee used
            }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        expect(response).to have_http_status(:created)
      end
    end

    context 'when the data is there and is correct (with employee)' do
      it 'returns a succesful response' do
        service = FactoryGirl.create :service
        client = FactoryGirl.create :client
        employee =FactoryGirl.create :employee
        data = {
          "data": {
            "type": "appointments",
            "attributes": {
                "color":"#AB00FF",
                "text_color":"#FFFFFF",
                "title":"New Appointment 123 5",
                "start":"2016-11-08T00:00:00.000Z",
                "end":"2016-11-08T00:00:00.000Z",
                "notes":"test note",
                "status":"pending"
            },
            "relationships": {
              "service":{"data":{"type":"services", "id": service.id}},
              "client":{"data":{"type":"clients", "id": client.id}},
              "employee":{"data":{"type":"employees", "id": employee.id}}
            }
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
                "color":"#bb",
                "text_color":"aa",
                "title":"888ZZZ7777zzz***9999",
                "start":"kkk",
                "end":"lll",
                "notes":"111aaaa",
                "status":"test"
              },
              "type":"appointments"
              }
            }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq({"status"=>["Please enter a valid status: pending, confirmed, new time proposed, completed or cancelled"], "service"=>["must exist"], "employee"=>["must exist"], "client"=>["must exist"]}
)
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there but FK constraint not respected' do
      it 'returns a succesful response' do
        data = {
          "data": {
            "type": "appointments",
            "attributes": {
                "color":"#AB00FF",
                "text_color":"#FFFFFF",
                "title":"New Appointment 123 5",
                "start":"2016-11-08T00:00:00.000Z",
                "end":"2016-11-08T00:00:00.000Z",
                "notes":"test note",
                "status":"pending"
            },
            "relationships": {
              "service":{"data":{"type":"services", "id": 9}},
              "client":{"data":{"type":"clients", "id": 9}},
              "employee":{"data":{"type":"employees", "id": 9}}
            }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq({"service"=>["must exist"], "employee"=>["must exist"], "client"=>["must exist"]}
)
        expect(response).to have_http_status(:bad_request)
      end
    end
   end

   describe 'PATCH Appointment#update' do
    context 'when no such appointment exists' do
      it 'returns an error' do

        appointment = FactoryGirl.create :appointment
        appointment.title = "Updated title"

        # Create a serializer instance
        serializer = AppointmentSerializer.new(appointment)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such appointment exists')
        expect(response).to have_http_status(:not_found)
      end
    end


    context 'when the appointment exists and the update had no params sent' do
      it "responds with a bad request" do
        appointment = FactoryGirl.create :appointment

        patch :update, params: { id: appointment.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Appointment update failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the appointment exists and the correct params were sent' do
      it "responds successfully" do
        appointment = FactoryGirl.create :appointment
        client = FactoryGirl.create :client
        service = FactoryGirl.create :service
        employee = FactoryGirl.create :employee
        appointment.color = "#A022FF"
        appointment.text_color = "#c1111F"
        appointment.title = "Updated title"
        appointment.start = "2017-12-08T00:00:00.000Z"
        appointment.end = "2019-02-04T00:00:00.000Z"
        appointment.notes = "Updated note"
        appointment.status = "confirmed"
        appointment.client_id = client.id
        appointment.service_id = service.id
        appointment.employee_id = employee.id

        # Create a serializer instance
        serializer = AppointmentSerializer.new(appointment)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: {id: appointment.id, data: params['data']}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response['data']['id'].to_i).to eq(appointment.id)
        attr = parsed_response['data']['attributes']
        expect(attr["color"]).to eq(appointment.color)
        expect(attr["text_color"]).to eq(appointment.text_color)
        expect(attr["title"]).to eq(appointment.title)
        expect(attr["start"]).to eq("2017-12-08T00:00:00.000Z")
        expect(attr["end"]).to eq("2019-02-04T00:00:00.000Z")
        expect(attr["notes"]).to eq(appointment.notes)
        expect(attr["status"]).to eq(appointment.status)
        #VERIFYING APPOINTMENT POINTS TO OBJECTS
        expect(parsed_response["data"]["relationships"]["client"]["data"]["id"].to_i).to eq(appointment.client_id)
        expect(parsed_response["data"]["relationships"]["service"]["data"]["id"].to_i).to eq(appointment.service_id)
        expect(parsed_response["data"]["relationships"]["employee"]["data"]["id"].to_i).to eq(appointment.employee_id)
        # #VERIFYING THAT OBJECTS POINT TO APPOINTMENT
        expect(Client.find(appointment.client_id).appointments[0].id).to eq (appointment.id)
        expect(Service.find(appointment.service_id).appointments[0].id).to eq (appointment.id)
        expect(Employee.find(appointment.employee_id).appointments[0].id).to eq (appointment.id)

        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the appointment exists and the incorrect params were sent' do
      it "responds successfully" do
        appointment = FactoryGirl.create :appointment
        appointment.color = "aa"
        appointment.text_color = "bb"
        appointment.title = "Updated title"
        appointment.start = "aa"
        appointment.end = "bb"
        appointment.notes = "Updated note"
        appointment.status = "kk"

        # Create a serializer instance
        serializer = AppointmentSerializer.new(appointment)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: {id: appointment.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq( {"status"=>["Please enter a valid status: pending, confirmed, new time proposed, completed or cancelled"]}
)

        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the appointment exists and FK constraints not respected' do
      it "responds successfully" do
        appointment = FactoryGirl.create :appointment
         appointment.color = "#A022FF"
        appointment.text_color = "#c1111F"
        appointment.title = "Updated title"
        appointment.start = "2017-12-08T00:00:00.000Z"
        appointment.end = "2019-02-04T00:00:00.000Z"
        appointment.notes = "Updated note"
        appointment.status = "confirmed"
        appointment.client_id = 1000
        appointment.service_id = 1000
        appointment.employee_id = 1000

        # Create a serializer instance
        serializer = AppointmentSerializer.new(appointment)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: {id: appointment.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq({"service"=>["must exist"], "employee"=>["must exist"], "client"=>["must exist"]}
)

        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
