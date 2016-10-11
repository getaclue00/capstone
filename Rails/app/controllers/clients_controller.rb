class ClientsController < ApplicationController

	#actions

	def index
		#all calls a method on db to return all clients
		@clients_array = Client.all
		#view and action have same name so render is implicit
	end

	def show
		#getting dynamic route from params hash
		@client=Client.find params[:id]	
	end

end