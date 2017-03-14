class CompanyPreferencesController < ApplicationController
  before_action :set_company_preference, only: [:show, :update]
  before_action :authenticate_user_from_token!, only: [:update]

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
    if current_user
      company_preference_id = params[:id].to_i
      if current_user.employee.company_preference.id == company_preference_id || current_user.admin?
        begin
          if @company_preference.update!(company_preference_params)
            byebug
            render json: @company_preference, status: :ok
          else
            render json: { error: 'not updated' }, status: :bad_request
          end
        rescue ActiveRecord::RecordNotFound => e
          render json: { error: 'No record exists' }, status: :not_found
        rescue ActiveRecord::RecordInvalid => e
          render json: { error: @company_preference.errors.messages}, status: :bad_request
        rescue ActiveRecord::StatementInvalid => e
         render json: { error: 'Update failed. Check your data.'}, status: :bad_request
        end
      end
    else
      render json: { error: 'Not Authorized' }, status: 401
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company_preference
      @company_preference = CompanyPreference.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def company_preference_params
      ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:is_hirable, :work_monday, :monday_open, :monday_close, :work_tuesday, :tuesday_open, :tuesday_close, :work_wednesday, :wednesday_open, :wednesday_close, :work_thursday, :thursday_open, :thursday_close, :work_friday, :friday_open, :friday_close, :work_saturday, :saturday_open, :saturday_close, :work_sunday, :sunday_open, :sunday_close, :employee])
    end
end
