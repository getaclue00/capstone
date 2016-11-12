require 'spec_helper'
require 'rails_helper'

RSpec.describe ServicesController, :type => :controller do
   include Devise::Test::ControllerHelpers

  describe 'GET Services#index' do
    context 'when there are no services' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No services exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when there are services' do
      it "returns with a successful response and the services" do
        FactoryGirl.create_list(:service_with_appointment, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET Services#show' do
    context 'when there are no services by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This service does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the service exists' do
      it 'returns the service data' do
        service = FactoryGirl.create :service_with_appointment

        get :show, params: { id: service.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(service.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"];
        
        expect(attr["name"]).to eq("serviceA")
        expect(attr["price_small"].to_f).to eq(120.0)
        expect(attr["price_large"].to_f).to eq(250.0)
        expect(attr["duration"].to_f).to eq(2.0)
        expect(attr["description"]).to eq("This is a description")
        expect(attr["active"]).to eq(true)
        expect(attr["displayable"]).to eq(false)
      end
    end
  end

  describe "POST Services#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Service creation failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there and is correct' do
      it 'returns a succesful response' do
        data = {
          "data": {
              "attributes": {
                "name":"name",
                "price_small":120.0,
                "price_large":250.0,
                "duration":1.5,
                "description":"This is a description",
                "active":true,
                "displayable":true
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
                "price_small":"f",
                "price_large":"rr",
                "duration":"ww",
                "description":"This is a description",
                "active":0,
                "displayable":9
              },
              "type":"services"
              }
      
            }
        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:bad_request)
        expect(result['error']).to eq('Service creation failed. Check your data.')
        
      end
    end
   end

  describe 'PATCH Service#update' do
    context 'when no such service exists' do
      it 'returns an error' do

        service = FactoryGirl.create :service_with_appointment
        service.name = "Testing Update of a non existent service"

        # Create a serializer instance
        serializer = ServiceSerializer.new(service)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such service exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the service exists and the update had no params sent' do
      it "responds with a bad request" do
        service = FactoryGirl.create :service_with_appointment

        patch :update, params: { id: service.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Service update failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the service exists and the correct params were sent' do
      it "responds successfully" do
        service = FactoryGirl.create :service_with_appointment
        service.name = "Testing Update of an existent service"
        service.price_small = 34.0
        service.price_large = 201.95
        service.duration = 2.5
        service.description = "This is a test"
        service.active = true
        service.displayable = true

        # Create a serializer instance
        serializer = ServiceSerializer.new(service)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: service.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['data']['id'].to_i).to eq(service.id)
        attributes = parsed_response['data']['attributes']
        expect(attributes['name']).to eq(service.name)
        expect(attributes['price_small'].to_f).to eq(service.price_small)
        expect(attributes['price_large'].to_f).to eq(service.price_large)
        expect(attributes['duration'].to_f).to eq(service.duration)
        expect(attributes['description']).to eq(service.description)
        expect(attributes['active']).to eq(service.active)
        expect(attributes['displayable']).to eq(service.displayable)

        expect(response).to have_http_status(:ok)
      end
    end

    #no test to updating with invalid attributes
    #invalid attributes passed to an update dont result in failures, they simply result in 0 values being assigned

      
  end

  describe 'DELETE Services#destroy' do
    context 'when there are no services by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 999 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such service exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the service exists and has no appointments' do
      it 'should delete it' do
        service = FactoryGirl.create :service

        delete :destroy, params: { id: service.id }

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the service exists and has appointments' do
      it 'should delete it' do
        FactoryGirl.create :service, :id => 0 #needed for FK constraints when handling associated appointments
        service = FactoryGirl.create :service_with_appointment
        appt_id = service.appointments[0].id

        delete :destroy, params: { id: service.id }

        expect(response).to have_http_status(:no_content)
        #validate that associated appointments service id set to 0
        expect(Appointment.find(appt_id).service_id).to eq (0)
      end
    end
  end
 end
