class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :price_small, :price_large, :duration, :description, :active, :displayable
  has_many :appointments
end
