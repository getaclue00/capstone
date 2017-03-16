class CompaniesController < ApplicationController
  before_action :set_company, only: [:show, :update]
  before_action :authenticate_user_from_token!, only: [:update]

  # GET /companies
  def index
    @companies = Company.all
  end

  # GET /companies/1
  def show
    render json: @company, status: :ok
  end

  # PATCH/PUT /companies/1
  def update
    if current_user
    else
      render json: { error: 'Not authorized' }, status: :bad_request
    end
  end

  private
    def set_company
      @company = Company.find(params[:id])
    end

    def company_params
      ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:name, :work_monday, :monday_open, :monday_close, :work_tuesday, :tuesday_open, :tuesday_close, :work_wednesday, :wednesday_open, :wednesday_close, :work_thursday, :thursday_open, :thursday_close, :work_friday, :friday_open, :friday_close, :work_saturday, :saturday_open, :saturday_close, :work_sunday, :sunday_open, :sunday_close, :employee_id, :contact_email, :contact_phone_number])
    end
end
