require 'spec_helper'
require 'rails_helper'

RSpec.describe ClientsController, :type => :controller do
   include Devise::Test::ControllerHelpers

   describe 'GET Clients#index' do
    context 'when there are no clients' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No clients exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when there are clients' do
      it "returns with a successful response and the clients" do
        FactoryGirl.create_list(:client_with_car, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET Clients#show' do
    context 'when there are no clients by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This client does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the client exists' do
      it 'returns the client data' do
        client = FactoryGirl.create :client_with_car
        car_id = client.cars[0].id

        get :show, params: { id: client.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(client.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"];
        
        expect(attr["last_name"]).to eq("test")
        expect(attr["first_name"]).to eq("test")
        expect(attr["phone_number"]).to eq("000-000-0000")
        expect(attr["street_number"].to_i).to eq(45)
        expect(attr["street_name"]).to eq("test")
        expect(attr["city"]).to eq("Ottawa")
        expect(attr["province"]).to eq("Ontario")
        expect(attr["postal_code"]).to eq("A0A 0A0")
        #VERIFYING CLIENT POINTS TO OBJECTS
        expect(result["data"]["relationships"]["cars"]["data"][0]["id"].to_i).to eq(car_id)
        #VERIFYING THAT OBJECTS POINT TO CLIENT
        expect(Car.find(car_id).client.id).to eq (client.id)
      end
    end
  end

  describe "POST Clients#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Client creation failed. No parameters sent.')
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
                "postal_code": "H7H 5U5"
              },
              "type":"clients"
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
              	#last_name is required
                "first_name": "Nada",
                "email": "test@test.com", #appended n to make it unique
                "phone_number": "345",
                "street_number": "tt",
                "street_name": "Bank street",
                "city": "Ottawa",
                "province": "Ontario",
                "postal_code": "H7"
              },
              "type":"clients"
              }
      
            }
        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(response).to have_http_status(:bad_request)
        expect(result['error']).to eq({"phone_number"=>["Please enter a valid phone number 000-000-0000"], "postal_code"=>["Please enter a valid postal code G5G 6T6"]}
)
        
      end
    end
   end


   describe 'PATCH Client#update' do
    context 'when no such client exists' do
      it 'returns an error' do

        client = FactoryGirl.create :client_with_car
        client.last_name = "Testing Update of a non existent client"

        # Create a serializer instance
        serializer = ClientSerializer.new(client)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such client exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the client exists and the update had no params sent' do
      it "responds with a bad request" do
        client = FactoryGirl.create :client_with_car

        patch :update, params: { id: client.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Client update failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the client exists and the correct params were sent' do
      it "responds successfully" do
        client = FactoryGirl.create :client_with_car
        client.last_name = "updated lastName"
        client.first_name = "updated firstName"
        client.email = "o@yahoo.com"
        client.phone_number = "111-111-1111"
        client.street_number = 3
        client.street_name = "Updated Street"
        client.city = "Updated city"
        client.province = "Updated province"
        client.postal_code = "J2J 9Q9"

        # Create a serializer instance
        serializer = ClientSerializer.new(client)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: client.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['data']['id'].to_i).to eq(client.id)
        attr = parsed_response['data']['attributes']      
        expect(attr["last_name"]).to eq(client.last_name)
        expect(attr["first_name"]).to eq(client.first_name)
        expect(attr["phone_number"]).to eq(client.phone_number)
        expect(attr["email"]).to eq(client.email)
        expect(attr["street_number"].to_i).to eq(client.street_number)
        expect(attr["street_name"]).to eq(client.street_name)
        expect(attr["city"]).to eq(client.city)
        expect(attr["province"]).to eq(client.province)
        expect(attr["postal_code"]).to eq(client.postal_code)

        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the client exists and the incorrect params were sent' do
      it "responds successfully" do
        client = FactoryGirl.create :client_with_car
        client.last_name = "updated lastName"
        client.first_name = "updated firstName"
        client.email = "o@yahoo.com"
        client.phone_number = "111-1"
        client.street_number = 3
        client.street_name = "Updated Street"
        client.city = "Updated city"
        client.province = "Updated province"
        client.postal_code = "J"

        # Create a serializer instance
        serializer = ClientSerializer.new(client)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: client.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq({"phone_number"=>["Please enter a valid phone number 000-000-0000"], "postal_code"=>["Please enter a valid postal code G5G 6T6"]}
)

        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe 'DELETE Clients#destroy' do
    context 'when there are no clients by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 999 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such client exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the client exists and has no cars' do
      it 'should delete it' do
        client = FactoryGirl.create :client

        delete :destroy, params: { id: client.id }

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the client exists and has cars' do
      it 'should delete it' do
        client = FactoryGirl.create :client_with_car
        car_id = client.cars[0].id

        delete :destroy, params: { id: client.id }

        expect(response).to have_http_status(:no_content)
        #validate that associated car is deleted
        begin
        	Car.find(car_id)
        	expect("car was not deleted").to eq("car was deleted")
        rescue ActiveRecord::RecordNotFound => e
        	expect(0).to eq(0)
        end
      end
    end
  end

end