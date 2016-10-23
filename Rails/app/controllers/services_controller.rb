class ServicesController < ApplicationController
	def index
		services_array=Service.all
		if services_array && !servicess_array.empty?
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
		@service=Service.new(service_sanitized_params)
		if(@service.save)
			render json: @service, status: :created
		else
			render json: { error: 'Service creation failed'}, status: :bad_request
		end
	end

	def update
		service=Service.find params[:id]
		if(service.update(service_sanitized_params))
			render json: service, status: :ok
		else
			render json: { error: 'Service update failed'}, status: :bad_request
		end
	end

	def destroy
		service=Service.find params[:id]
		service.destroy
		head :no_content #used when we are not sending back content
	end


	#anything beneath the key word private is private
	private 

		def service_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:name, :price_small, :price_large, :duration, :description] )
	end
end

  