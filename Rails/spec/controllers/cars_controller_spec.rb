require 'spec_helper'
require 'rails_helper'

RSpec.describe CarsController, :type => :controller do
   include Devise::Test::ControllerHelpers

   describe 'GET Cars#index' do
    context 'when there are no cars' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No cars exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when there are cars' do
      it "returns with a successful response and the cars" do
        FactoryGirl.create_list(:car_with_appointment, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'GET Cars#show' do
    context 'when there are no cars by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This car does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the car exists' do
      it 'returns the car data' do
        car = FactoryGirl.create :car_with_appointment
        client_id = car.client.id
        appointment_id = car.appointments[0].id
        

        get :show, params: { id: car.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(car.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"]

        expect(attr["make"]).to eq("carMake")
        expect(attr["model"]).to eq("carModel")
        expect(attr["size"]).to eq("small")
        expect(attr["interior"]).to eq("carInterior")
        expect(attr["colour"]).to eq("carColour")
        #VERIFYING CAR POINTS TO OBJECTS
        expect(result["data"]["relationships"]["client"]["data"]["id"].to_i).to eq(client_id)
        expect(result["data"]["relationships"]["appointments"]["data"][0]["id"].to_i).to eq(appointment_id)
        #VERIFYING THAT OBJECTS POINT TO CAR
        expect(Client.find(client_id).cars[0].id).to eq (car.id)
        expect(Appointment.find(appointment_id).car.id).to eq (car.id)
      end
    end
  end

  describe "POST Cars#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Car creation failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end

   context 'when the data is there and is correct' do
      it 'returns a succesful response' do
        client = FactoryGirl.create :client
        data = {
          "data": {
            "type": "cars",
            "attributes": {
              	"make":"carMake",
                "model":"carModel",
                "size":"large SUV",
                "interior":"CarInterior",
                "colour":"carColour"
            },
            "relationships": {
              "client":{"data":{"type":"clients", "id": client.id}} 
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
                #make is compulsory
                "model":"",
                "size":"test",
                "interior":"CarInterior",
                "colour":"carColour"
              },
              "type":"cars"
              }
            }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq( {"size"=>["Please enter a valid size: small, van, truck, or large SUV"]}
)
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there but FK constraint not respected' do
      it 'returns a succesful response' do
        client = FactoryGirl.create :client
        data = {
          "data": {
            "type": "cars",
            "attributes": {
              	"make":"carMake",
                "model":"carModel",
                "size":"large SUV",
                "interior":"CarInterior",
                "colour":"carColour"
            },
            "relationships": {
              "client":{"data":{"type":"clients", "id": 77}} 
            }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Car creation failed. Check your data.')
        expect(response).to have_http_status(:bad_request)
      end
    end
   end

   describe 'PATCH Car#update' do
    context 'when no such car exists' do
      it 'returns an error' do

        car = FactoryGirl.create :car_with_appointment
        car.make = "Updated make"

        # Create a serializer instance
        serializer = CarSerializer.new(car)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such car exists')
        expect(response).to have_http_status(:not_found)
      end
    end


    context 'when the car exists and the update had no params sent' do
      it "responds with a bad request" do
        car = FactoryGirl.create :car_with_appointment

        patch :update, params: { id: car.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Car update failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the car exists and the correct params were sent' do
      it "responds successfully" do
        car = FactoryGirl.create :car_with_appointment
        client = FactoryGirl.create :client
        car.make = "Updated make"
        car.model = "Updated model"
        car.size = "truck"
        car.interior = "Update interior"
        car.colour = "Updated colour"
        car.client_id = client.id
        
        # Create a serializer instance
        serializer = CarSerializer.new(car)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: car.id, data: params['data']}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response['data']['id'].to_i).to eq(car.id)
        attr = parsed_response['data']['attributes']      
        expect(attr["make"]).to eq(car.make)
        expect(attr["model"]).to eq(car.model)
        expect(attr["size"]).to eq(car.size)
        expect(attr["interior"]).to eq(car.interior)
        expect(attr["colour"]).to eq(car.colour)
         #VERIFYING CAR POINTS TO OBJECTS
        expect(parsed_response["data"]["relationships"]["client"]["data"]["id"].to_i).to eq(car.client.id)
        #VERIFYING THAT OBJECTS POINT TO CAR
        expect(Client.find(car.client_id).cars[0].id).to eq (car.id)

        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the car exists and the incorrect params were sent' do
      it "responds successfully" do
        car = FactoryGirl.create :car_with_appointment
        car.make = "Updated make"
        car.model = "Updated model"
        car.size = "jj"
        car.interior = "Update interior"
        car.colour = "Updated colour"

        # Create a serializer instance
        serializer = CarSerializer.new(car)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)
       
        patch :update, params: {id: car.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq({"size"=>["Please enter a valid size: small, van, truck, or large SUV"]}
)

        expect(response).to have_http_status(:bad_request)
      end
    end

    #NOTE THAT UPDATING THE CAR WITH A NON EXISTENT CLIENT ID SETS THE FEILD TO NIL
    #just make it compuslory and error will be thrown and add a test for it :)
 
   end

   describe 'DELETE Cars#destroy' do
    context 'when there are no cars by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 999 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such car exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the car exists and has no appointments' do
      it 'should delete it' do
        car = FactoryGirl.create :car

        delete :destroy, params: { id: car.id }

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the car exists and has appointments' do
      it 'should delete it' do
        FactoryGirl.create :car, :id => 0 #needed for FK constraints when handling associated appointments
        car = FactoryGirl.create :car_with_appointment
        appt_id = car.appointments[0].id

        delete :destroy, params: { id: car.id }

        expect(response).to have_http_status(:no_content)
        #validate that associated appointments service id set to 0
        expect(Appointment.find(appt_id).car_id).to eq (0)
      end
    end
  end

end