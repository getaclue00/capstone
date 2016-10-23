class ClientsController < ApplicationController

	#actions
	#render is implicit for all actions since name of action and view are the same

	def index
		clients_array=Client.all
		if clients_array && !clients_array.empty?
      		render json: clients_array, status: :ok
    	else
      		render json: { error: 'No clients exist' }, status: :bad_request
    	end
	end

	def show
		begin 
			client=Client.find params[:id]
			render json: client, status: :ok
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'This client does not exist' }, status: :not_found
		end
	end

	def create
		@client=Client.new(client_sanitized_params)
		if(@client.save)
			#location specifies where to find created resource
			render json: @client, status: :created, location: @client
		else
			render json: { error: 'Client creation failed'}, status: :bad_request
		end
	end

	def update
		client=Client.find params[:id]
		if(client.update(client_sanitized_params))
			render json: client, status: :created, location: client
		else
			render json: { error: 'Client update failed'}, status: :bad_request
		end
	end

	def destroy
		client=Client.find params[:id]
		client.destroy
		render nothing: true, status: :ok
	end


	#anything beneath the key word private is private
	private 

		def client_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code] )
	end
end

  