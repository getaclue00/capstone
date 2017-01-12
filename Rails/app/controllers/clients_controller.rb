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
		begin
	        client=Client.new(client_sanitized_params)
	        if client.save!
	  			render json: client, status: :created
	  		else
	  			render json: { error: 'Client creation failed. Check your data.'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	      render json: { error: 'Client creation failed. No parameters sent.'}, status: :bad_request
	    rescue ActiveRecord::StatementInvalid => e
	      render json: { error: 'Client creation failed. Check your data.'}, status: :bad_request
	    rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
	      render json: { error: client.errors.messages}, status: :bad_request
		end
	end

	def update
		begin
			client=Client.find params[:id]
	        if client.update!(client_sanitized_params)
	  			render json: client, status: :ok
	  		else
	  			render json: { error: 'Client update failed'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	        render json: { error: 'Client update failed. No parameters sent.'}, status: :bad_request
		rescue ActiveRecord::RecordNotFound => e
				render json: { error: 'No such client exists' }, status: :not_found
		rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
	      render json: { error: client.errors.messages}, status: :bad_request
		end
	end

	def destroy
		begin
			client=Client.find params[:id]
			client.destroy
			head :no_content
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'No such client exists' }, status: :not_found
		end
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

  