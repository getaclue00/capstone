require 'spec_helper'
require 'rails_helper'

RSpec.describe AppointmentsController, :type => :controller do
  include Devise::Test::ControllerHelpers

  describe 'GET Appointments#index' do
    context 'when there are no appointments' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No appointments exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when there are appointments' do
      it "returns with a successful response and the appointments" do
        FactoryGirl.create_list(:appointment, 5)

        get :index

        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
      end
    end
  end

  describe 'GET Appointments#show' do
    context 'when there are no appointments by such an id' do
      it 'returns an error' do
        get :show, params: { id: 55 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This appointment does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the appointment exists' do
      it 'returns the appointment data' do
        appointment = FactoryGirl.create :appointment

        get :show, params: { id: appointment.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(appointment.id)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe "POST Appointments#create" do
    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Appointment creation failed.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there' do
      it 'returns a succesful response' do
        data = {
          "data": {
              "attributes": {
                "color":"#AB00FF",
                "text_color":"#FFFFFF",
                "title":"New Appointment 123 5",
                "start":"2016-10-28T00:00:00.000Z",
                "end":"2016-10-28T00:00:00.000Z",
                "notes":""
              },
              "type":"appointments"
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
                "color":"zzz",
                "text_color":"aaa",
                "title":"888ZZZ7777zzz***9999",
                "start":"1***",
                "end":"239898****",
                "notes":"111aaaa"
              },
              "type":"appointments"
              }
            }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq('Appointment creation failed. Check your data.')
        expect(response).to have_http_status(:bad_request)
      end
    end
  end

  describe 'PATCH Appointment#update' do
    context 'when there are no such appointments' do
      it 'returns an error' do
        patch :update, params: { id: 777 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No appointments exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the appointment exists and the update had no params sent' do
      it "responds with a bad request" do
        appointment = FactoryGirl.create :appointment

        patch :update, params: { id: appointment }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('Appointment update failed')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the appointment exists and the correct params were sent' do
      it "responds successfully" do
        appointment = FactoryGirl.create :appointment
        appointment_to_update = FactoryGirl.create :appointment
        appointment_to_update.id = appointment.id
        appointment_to_update.title = "Testing Update"

        # THIS MESS IS TO SEND DATA USING OUR serializer
        resource = Appointment.new(appointment_to_update.attributes)
        serializer = AppointmentSerializer.new(resource)
        adapter = ActiveModelSerializers::Adapter.create(serializer)
        serializable_resource = ActiveModelSerializers::SerializableResource.new(resource)

        # I had to do this because I didn't know how to send serializable_resource properly... as_json and to_json and serializable_hash didn't work

        params = JSON.parse(serializable_resource.to_json)

        patch :update, params: {id: appointment.id, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['data']['id'].to_i).to eq(appointment.id)
        expect(result['data']['attributes']['title']).to eq(resource.title)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  describe 'DELETE Appointments#destroy' do
    context 'when there are no appointments by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 43 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No appointments exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the appointment exists' do
      it 'should delete it' do
        appointment = FactoryGirl.create :appointment

        delete :destroy, params: { id: appointment.id }

        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
