class Client < ActiveRecord::Base 
	#ActiveRecord superclass provides setters and getters and methods to access & modify db table

	validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/,
    message: "Please enter a valid phone number 000-000-0000" } 

    validates :postal_code, format: { with: /[A-Z][0-9][A-Z](\s|)[0-9][A-Z][0-9]/,
    message: "Please enter a valid postal code G5G 6T6" } 

	#needed for serializer to recognize cars
	#dependent destroy says if i delete client, delete his cars
	has_many :cars, dependent: :destroy
end