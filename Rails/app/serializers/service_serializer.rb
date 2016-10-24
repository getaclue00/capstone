class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :price_small, :price_large, :duration, :description
end
