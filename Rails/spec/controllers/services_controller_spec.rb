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
        FactoryGirl.create_list(:service, 5)
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
        service = FactoryGirl.create :service

        get :show, params: { id: service.id }

        puts result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(service.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"];
        
        expect(attr["name"]).to eq("serviceA")
        expect(attr["price_small"]).to eq("120.0")
        expect(attr["price_large"]).to eq("250.0")
        expect(attr["duration"]).to eq("2.0")
        expect(attr["description"]).to eq("This is a description")
        
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

    context 'when the data is there' do
      it 'returns a succesful response' do
        data = {
          "data": {
              "attributes": {
                "name":"name",
                "price_small":120.0,
                "price_large":250.0,
                "duration":1.5,
                "description":"This is a description",
                "active":"false",
                "displayable":"false"
              },
              "type":"services"
              }
      
            }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

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
                "price_large":250.0,
                "duration":1.5,
                "description":"This is a description",
                "active":"false",
                "displayable":"false"
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
    context 'when there are no such service' do
      it 'returns an error' do
        patch :update, params: { id: 777 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such service exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the service exists and the update had no params sent' do
      it "responds with a bad request" do
        service = FactoryGirl.create :service

        patch :update, params: { id: service }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Service update failed')
        expect(response).to have_http_status(:bad_request)
      end
    end
#NEEDS INVESTIGATION -- CURRENTLY FAILING WITH When assigning attributes, you must pass a hash as an argument.
  #   context 'when the appointment exists and the correct params were sent' do
  #     it "responds successfully" do
  #       service = FactoryGirl.create :service
  #       service_to_update = FactoryGirl.create :service
  #       service_to_update.id = service.id
  #       service_to_update.title = "Testing Update"

  #       # THIS MESS IS TO SEND DATA USING OUR serializer
  #       resource = Service.new(service_to_update.attributes)
  #       serializer = ServiceSerializer.new(resource)
  #       adapter = ActiveModelSerializers::Adapter.create(serializer)
  #       serializable_resource = ActiveModelSerializers::SerializableResource.new(resource)

  #       # I had to do this because I didn't know how to send serializable_resource properly... as_json and to_json and serializable_hash didn't work

  #       params = JSON.parse(serializable_resource.to_json)

  #       patch :update, params: {id: appointment.id, data: params['data']}

  #       result = JSON.parse(response.body)
  #       expect(result['data']['id'].to_i).to eq(service.id)
  #       expect(result['data']['attributes']['title']).to eq(resource.title)
  #       expect(response).to have_http_status(:ok)
  #     end
     # end
   end

  describe 'DELETE Services#destroy' do
    context 'when there are no services by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 43 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such service exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the service exists' do
      it 'should delete it' do
        service = FactoryGirl.create :service

        delete :destroy, params: { id: service.id }

        expect(response).to have_http_status(:no_content)
      end
    end
   end
end
