require 'rails_helper'

RSpec.describe CompanyPreferencesController, type: :controller do

  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all company_preferences as @company_preferences" do
      company_preference = CompanyPreference.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(assigns(:company_preferences)).to eq([company_preference])
    end
  end

  describe "GET #show" do
    it "assigns the requested company_preference as @company_preference" do
      company_preference = CompanyPreference.create! valid_attributes
      get :show, params: {id: company_preference.to_param}, session: valid_session
      expect(assigns(:company_preference)).to eq(company_preference)
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested company_preference" do
        company_preference = CompanyPreference.create! valid_attributes
        put :update, params: {id: company_preference.to_param, company_preference: new_attributes}, session: valid_session
        company_preference.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested company_preference as @company_preference" do
        company_preference = CompanyPreference.create! valid_attributes
        put :update, params: {id: company_preference.to_param, company_preference: valid_attributes}, session: valid_session
        expect(assigns(:company_preference)).to eq(company_preference)
      end

      it "redirects to the company_preference" do
        company_preference = CompanyPreference.create! valid_attributes
        put :update, params: {id: company_preference.to_param, company_preference: valid_attributes}, session: valid_session
        expect(response).to redirect_to(company_preference)
      end
    end

    context "with invalid params" do
      it "assigns the company_preference as @company_preference" do
        company_preference = CompanyPreference.create! valid_attributes
        put :update, params: {id: company_preference.to_param, company_preference: invalid_attributes}, session: valid_session
        expect(assigns(:company_preference)).to eq(company_preference)
      end

      it "re-renders the 'edit' template" do
        company_preference = CompanyPreference.create! valid_attributes
        put :update, params: {id: company_preference.to_param, company_preference: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

end
