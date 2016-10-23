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
		@car=Car.new(car_sanitized_params)
		if(@car.save)
			#location specifies where to find created resource
			render json: @car, status: :created, location: @car
		else
			render json: { error: 'Car creation failed'}, status: :bad_request
		end
	end

	def update
		car=Car.find params[:id]
		if(car.update(car_sanitized_params))
			render json: car, status: :created, location: car
		else
			render json: { error: 'Car update failed'}, status: :bad_request
		end
	end

	def destroy
		car=Car.find params[:id]
		car.destroy
		render nothing: true, status: :ok
	end


	#anything beneath the key word private is private
	private 

		def car_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:make, :model, :size, :interior, :colour] )
	end
end

  