require "rails_helper"

RSpec.describe UsersController, :type => :controller do
  include Devise::Test::ControllerHelpers

  describe "GET users#index" do
    context 'when no filter and users are not present' do
      it "returns an error" do
        get :index

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No users exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when different param and users are not present' do
      it "returns an error" do
        get :index, {:params => {:sort => 'title'}}

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No users exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when no filter and users are present' do
      it "returns with a successful response and the users" do
        FactoryGirl.create_list(:user, 5)
        get :index
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when different param and users are present' do
      it "returns with a successful response and the users" do
        FactoryGirl.create_list(:user, 5)
        get :index, {:params => {:sort => 'title'}}
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when filter and users are not present' do
      it "returns an error" do
        get :index, {:params => {:filter => {:user_type => ''}}}

        result = JSON.parse(response.body)

        expect(result['error']).to eq('No users exist')
        expect(response).to have_http_status(400)
      end
    end

    context 'when filter and users are present' do
      it "returns with a successful response and the users" do
        FactoryGirl.create_list(:user, 5)
        get :index, {:params => {:filter => {:user_type => ''}}}
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when acceptable filter and users are present' do
      it "returns with a successful response and the users" do
        FactoryGirl.create_list(:user, 5)
        get :index, {:params => {:filter => {:user_type => 'admin'}}}
        result = JSON.parse(response.body)
        expect(result['data'].length).to eq(5)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when unacceptable filter and users are present' do
      it "returns an error" do
        FactoryGirl.create_list(:user, 5)
        get :index, {:params => {:filter => {:user_type => 'batman'}}}
        result = JSON.parse(response.body)
        expect(result['error']).to eq('No users exist')
        expect(response).to have_http_status(400)
      end
    end
  end

  describe "GET users#show" do

    context 'when there are no users by such an id' do
      it 'returns an error' do
        get :show, params: { id: 1 }

        result = JSON.parse(response.body)

        expect(result['error']).to eq('This user does not exist')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the user exists' do
      it 'returns the user data' do
        user = FactoryGirl.create :user
        employee_id = user.employee.id

        get :show, params: { id: user.id }

        result = JSON.parse(response.body)

        expect(result['data']['id'].to_i).to eq(user.id)
        expect(response).to have_http_status(:ok)

        attr = result["data"]["attributes"]

        expect(attr["admin"]).to eq(true)
        #VERIFYING USER POINTS TO EMPLOYEE
        expect(result["data"]["relationships"]["employee"]["data"]["id"].to_i).to eq(employee_id)

        #VERIFYING THAT EMPLOYEE POINT TO USER
        expect(Employee.find(employee_id).user.id).to eq (user.id)

      end
    end
  end

  describe "POST Users#create" do

    context 'when the data is empty' do
      it "returns an error" do
        post :create

        result = JSON.parse(response.body)

        expect(result['error']).to eq('User creation failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end


   context 'when the data is there and is correct' do
      it 'returns a succesful response' do
        employee = FactoryGirl.create :employee
        data = {
          "data": {
            "type": "users",
            "attributes": {
                "email":"test@test.com",
                "password":"password",
                "admin":true
            },
            "relationships": {
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
        employee = FactoryGirl.create :employee
        data = {
          "data": {
              "type":"users",
              "attributes": {
                "email":"test@test.com",
                #password is mandatory
                "admin":true
              },
              "relationships": {
                "employee":{"data":{"type":"employees", "id": employee.id}}
              }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq( {"password" => ["can't be blank"]}
)
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there but not associated to employee' do
      it 'returns a bad response' do
        data = {
          "data": {
              "type":"users",
              "attributes": {
                "email":"test@test.com",
                "password":"password",
                "admin":true
              }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq( {"employee" => ["must exist"]}
)
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the data is there but FK constraint not respected' do
      it 'returns a succesful response' do
        employee = FactoryGirl.create :employee
        data = {
          "data": {
            "type": "users",
            "attributes": {
                "email":"test@test.com",
                "password":"password",
                "admin":true
            },
            "relationships": {
              "employee":{"data":{"type":"employees", "id": 77}}
            }
          }
        }

        params = JSON.parse(data.to_json)

        post :create, params: {data: params['data']}

        result = JSON.parse(response.body)

        expect(result['error']).to eq({"employee" => ["must exist"]})
        expect(response).to have_http_status(:bad_request)
      end
    end
   end

  describe 'PATCH User#update' do
    context 'when no such user exists' do
      it 'returns an error' do

        user = FactoryGirl.create :user
        user.password = "Updated password"

        # Create a serializer instance
        serializer = UserSerializer.new(user)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: { id: 777, data: params['data']}

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such user exists')
        expect(response).to have_http_status(:not_found)
      end
    end


    context 'when the user exists and the update had no params sent' do
      it "responds with a bad request" do
        user = FactoryGirl.create :user

        patch :update, params: { id: user.id }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('User update failed. No parameters sent.')
        expect(response).to have_http_status(:bad_request)
      end
    end

    context 'when the user exists and the correct params were sent' do
      it "responds successfully" do
        user = FactoryGirl.create :user
        user.email = "new@new.com"
        user.password = "password"
        user.admin = true
        # we made it such that employee for a given user cannot be updated

        # Create a serializer instance
        serializer = UserSerializer.new(user)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: {id: user.id, data: params['data']}

        parsed_response = JSON.parse(response.body)

        expect(parsed_response['data']['id'].to_i).to eq(user.id)
        attr = parsed_response['data']['attributes']
        expect(attr["email"]).to eq(user.email)
        expect(attr["password"]).to eq(nil) #we dont return password
        expect(attr["admin"]).to eq(user.admin)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when the user exists and the incorrect params were sent' do
      it "responds successfully" do
        user = FactoryGirl.create :user
        user.email = "new"
        user.password = "dd"
        user.admin = true

        # Create a serializer instance
        serializer = UserSerializer.new(user)
        # Create a serialization based on the configured adapter
        serialization = ActiveModelSerializers::Adapter.create(serializer)
        #converts to JSON API format
        params = JSON.parse(serialization.to_json)

        patch :update, params: {id: user.id, data: params['data']}

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['error']).to eq({"email"=>["is invalid"]})
        expect(response).to have_http_status(:bad_request)
      end
    end
   end

   describe 'DELETE Users#destroy' do
    context 'when there are no users by such an id' do
      it 'returns an error' do
        delete :destroy, params: { id: 999 }

        result = JSON.parse(response.body)
        expect(result['error']).to eq('No such user exists')
        expect(response).to have_http_status(:not_found)
      end
    end

    context 'when the user exists' do
      it 'should delete it' do
        user = FactoryGirl.create :user

        delete :destroy, params: { id: user.id }

        expect(response).to have_http_status(:no_content)
      end
    end
  end
end
