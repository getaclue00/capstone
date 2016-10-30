class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :price_small, :price_large, :duration, :description
  has_many :appointments, dependent: :nullify  # updates the associated records foreign
                                              # key value to NULL rather than destroying it
end
