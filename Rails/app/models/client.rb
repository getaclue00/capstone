class Client < ActiveRecord::Base 
	#ActiveRecord superclass provides setters and getters and methods to access & modify db table
	#needed for serializer to recognize cars
	#dependent destroy says if i delete client, delete his cars
	has_many :cars, dependent: :destroy 
end