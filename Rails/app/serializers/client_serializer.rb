class ClientSerializer < ActiveModel::Serializer
	#attributes returned as part of jsonAPI response
  attributes :id, :last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code
  has_many :cars
end
