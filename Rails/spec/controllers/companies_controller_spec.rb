require 'rails_helper'

RSpec.describe CompaniesController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Company. As you add validations to Company, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # CompaniesController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all companies as @companies" do
      company = Company.create! valid_attributes
      get :index, params: {}, session: valid_session
      expect(assigns(:companies)).to eq([company])
    end
  end

  describe "GET #show" do
    it "assigns the requested company as @company" do
      company = Company.create! valid_attributes
      get :show, params: {id: company.to_param}, session: valid_session
      expect(assigns(:company)).to eq(company)
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested company" do
        company = Company.create! valid_attributes
        put :update, params: {id: company.to_param, company: new_attributes}, session: valid_session
        company.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested company as @company" do
        company = Company.create! valid_attributes
        put :update, params: {id: company.to_param, company: valid_attributes}, session: valid_session
        expect(assigns(:company)).to eq(company)
      end

      it "redirects to the company" do
        company = Company.create! valid_attributes
        put :update, params: {id: company.to_param, company: valid_attributes}, session: valid_session
        expect(response).to redirect_to(company)
      end
    end

    context "with invalid params" do
      it "assigns the company as @company" do
        company = Company.create! valid_attributes
        put :update, params: {id: company.to_param, company: invalid_attributes}, session: valid_session
        expect(assigns(:company)).to eq(company)
      end

      it "re-renders the 'edit' template" do
        company = Company.create! valid_attributes
        put :update, params: {id: company.to_param, company: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

end
