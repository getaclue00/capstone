class CarsController < ApplicationController

	def index
		cars_array=Car.all
		if cars_array && !cars_array.empty?
      		render json: cars_array, status: :ok
    	else
      		render json: { error: 'No cars exist' }, status: :bad_request
    	end
	end

	def show
		begin 
			car=Car.find params[:id]
			render json: car, status: :ok
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'This car does not exist' }, status: :not_found
		end
	end

	def create
		begin
	        car=Car.new(car_sanitized_params)
	        if car.save!
	  			render json: car, status: :created
	  		else
	  			render json: { error: 'Car creation failed. Check your data.'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	      render json: { error: 'Car creation failed. No parameters sent.'}, status: :bad_request
	    rescue ActiveRecord::StatementInvalid => e #thrown when migration restriction or FK constraint not respected
	      render json: { error: 'Car creation failed. Check your data.'}, status: :bad_request
	    rescue ActiveRecord::RecordInvalid => e
	      render json: { error: car.errors.messages}, status: :bad_request
		end
	end

	def update
		begin
			car=Car.find params[:id]
	        if car.update!(car_sanitized_params)
	  			render json: car, status: :ok
	  		else
	  			render json: { error: 'Car update failed'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	        render json: { error: 'Car update failed. No parameters sent.'}, status: :bad_request
		rescue ActiveRecord::RecordNotFound => e
				render json: { error: 'No such car exists' }, status: :not_found
		rescue ActiveRecord::RecordInvalid => e
	      render json: { error: car.errors.messages}, status: :bad_request
		end
		#NOTE THAT UPDATING THE CAR WITH A NON EXISTENT CLIENT ID SETS THE FEILD TO NIL
		#just make it compuslory and error will be thrown
	end

	def destroy
		begin
			car=Car.find params[:id]
			car.destroy
			head :no_content
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'No such car exists' }, status: :not_found
		end
	end


	#anything beneath the key word private is private
	private 

		def car_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:make, :model, :size, :interior, :colour, :client] )
	end
end

  