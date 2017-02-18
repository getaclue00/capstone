class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :vehicle_size, :duration, :description, :active, :displayable
  has_many :appointments
end
