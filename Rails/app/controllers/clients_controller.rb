class ClientsController < ApplicationController

	#actions
	#render is implicit for all actions since name of action and view are the same

	def index
		#all calls a method on db to return all clients
		@clients_array = Client.all
	end

	def show
		#getting dynamic route from params hash
		@client=Client.find params[:id]	
	end

	def new
		@client=Client.new
	end

	def create
		#client hash obtained as payload with the POST request send by the form_builder
		#use Strong parameters in mass assignments using new
		@client=Client.new (client_sanitized_params)

		 if(@client.save)
		 	#send a new request to redirect to client created
		 	redirect_to "/clients/#{@client.id}"
		 	#@client since new srequests dont have access to variables
		 	#above equivalent to 
		 	#redirect_to "/clients/"+@client.id.to_s
		 else
		 	#bring up a new form again
		 	render ("new")
		 end
	end

	def edit
		@client = Client.find(params[:id])
	end

	def update
		client = Client.find(params[:id])
	
		#.update updates the object in memory and calls .save to the db as well and return boolean depending on if it is successful
		if client.update(client_sanitized_params)
			#redirecting to updated client
			redirect_to "/clients/#{client.id}" 		
		else
			#since the edit form requires access to the client to populate the form fields
			@client=client
			render("edit")
		end
	end

	def destroy
		client=Client.find(params[:id])
		client.destroy
		redirect_to "/clients"
	end


	#anything beneath the key word private is private
	private 

		def client_sanitized_params
			params.require(:client).permit(:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code)
		end


end