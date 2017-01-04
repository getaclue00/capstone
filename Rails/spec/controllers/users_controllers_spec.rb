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
        get :index, {:params => {:filter => {:user_type => 'employee'}}}
        result = JSON.parse(response.body)
        expect(result['error']).to eq('No users exist') # since employee is false by default 
        expect(response).to have_http_status(400)
      end
    end

    context 'when unacceptable filter and users are present' do
      it "returns with a successful response and the users" do
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

        expect(attr["first_name"]).to eq("Tester")
        expect(attr["last_name"]).to eq("Testing")
        expect(attr["telephone"]).to eq("000-000-0000")
        expect(attr["admin"]).to eq(true)
        #VERIFYING USER POINTS TO EMPLOYEE
        expect(result["data"]["relationships"]["employee"]["data"]["id"].to_i).to eq(employee_id)
        
        #VERIFYING THAT EMPLOYEE POINT TO USER
        expect(Employee.find(employee_id).user.id).to eq (user.id)
        
      end
    end
  end
end
