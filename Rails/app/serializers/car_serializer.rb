class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :size, :interior, :colour
  belongs_to :client
  has_many :appointments
end
