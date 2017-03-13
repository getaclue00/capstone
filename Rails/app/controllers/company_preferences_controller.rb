class CompanyPreferencesController < ApplicationController
  before_action :set_company_preference, only: [:show, :edit, :update, :destroy]

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
      redirect_to @company_preference, notice: 'Company preference was successfully updated.'
    else
      render :edit
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company_preference
      @company_preference = CompanyPreference.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def company_preference_params
      params.require(:company_preference).permit(:workMonday, :mondayOpen, :mondayClose, :workTuesday, :tuesdayOpen, :tuesdayClose, :workWednesday, :wednesdayOpen, :wednesdayClose, :workThursday, :thursdayOpen, :thursdayClose, :workFriday, :fridayOpen, :fridayClose, :workSaturday, :saturdayOpen, :saturdayClose, :workSunday, :sundayOpen, :sundayClose, :employee_id)
    end
end
