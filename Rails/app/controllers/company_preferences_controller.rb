class CompanyPreferencesController < ApplicationController
  before_action :set_company_preference, only: [:show, :update]

  # GET /company_preferences
  def index
    @company_preferences = CompanyPreference.all
    render json: @company_preferences, status: :ok
  end

  # GET /company_preferences/1
  def show
    render json: @company_preference, status: :ok
  end

  # PATCH/PUT /company_preferences/1
  def update
    if @company_preference.update(company_preference_params)
      render json: @company_preference, status: :updated
    else
      render json: { error: 'not updated' }, status: :notok
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company_preference
      @company_preference = CompanyPreference.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def company_preference_params
      ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:work_monday, :monday_open, :monday_close, :work_tuesday, :tuesday_open, :tuesday_close, :work_wednesday, :wednesday_open, :wednesday_close, :work_thursday, :thursday_open, :thursday_close, :work_friday, :friday_open, :friday_close, :work_saturday, :saturday_open, :saturday_close, :work_sunday, :sunday_open, :sunday_close, :employee])
    end
end
