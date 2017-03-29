class ServicesController < ApplicationController

  before_action :authenticate_user_from_token!

  def index
    if params[:filter].present? && params[:filter][:vehicle_size].present?
      if params[:filter][:displayable].present?
        services_array = Service.where('vehicle_size = ? AND displayable = ?', params[:filter][:vehicle_size], params[:filter][:displayable]).all
      else
        services_array = Service.where('vehicle_size = ?', params[:filter][:vehicle_size]).all
      end
    else
      services_array=Service.all
    end

    if services_array && !services_array.empty?
      render json: services_array, status: :ok
    else
      render json: { error: 'No services exist' }, status: :bad_request
    end
  end

  def show
    begin
      service=Service.find params[:id]
      render json: service, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'This service does not exist' }, status: :not_found
    end
  end

  def create
    if current_user && current_user.admin?
      begin
        sanitized_params = service_sanitized_params
        if sanitized_params[:vehicle_size].nil?
          sanitized_params[:vehicle_size] = 'Small'
        end
        service=Service.new(sanitized_params)
        if service.save!
          render json: service, status: :created
        else
          render json: { error: 'Service creation failed. Check your data.'}, status: :bad_request
        end
      rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
        render json: { error: 'Service creation failed. No parameters sent.'}, status: :bad_request
      rescue ActiveRecord::StatementInvalid => e
        render json: { "errors": [
          {
            "detail": 'field missing',
            "source": {
              "pointer": "data/attributes/name" #indicating primary data object
            }
          }
        ]}, status: :bad_request
       end
    else
      render json: { error: 'Not Authorized' }, status: 401
    end
  end

  def update
    if current_user && current_user.admin?
      begin
        service=Service.find params[:id]
        if service.update!(service_sanitized_params)
          #this calls the ServiceSerializer
          render json: service, status: :ok
        else
          render json: { error: 'Service update failed. Check your data.'}, status: :bad_request
        end
      rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
        render json: { error: 'Service update failed. No parameters sent.'}, status: :bad_request
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: 'No such service exists' }, status: :not_found
      end
    else
      render json: { error: 'Not Authorized' }, status: 401
    end
  end

  def destroy
    if current_user && current_user.admin?
      begin
        service=Service.find params[:id]
        service.destroy
        head :no_content #used when we are not sending back content
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: 'No such service exists' }, status: :not_found
      end
    else
      render json: { error: 'Not Authorized' }, status: 401
    end
  end

  private

    def service_sanitized_params
      #take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that
      #can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
      # whereas the "safe" version simply returns an empty hash.
      #this changes from JSONAPI to json
      ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:name, :price, :vehicle_size, :duration, :description, :active, :displayable, :buffer_time] )
    end
end
