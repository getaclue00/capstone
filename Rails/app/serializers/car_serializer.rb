class CarSerializer < ActiveModel::Serializer
  attributes :id, :make, :model, :size, :interior, :colour
  belongs_to :client
  has_many :appointments, dependent: :nullify  # updates the associated records foreign
                                              # key value to NULL rather than destroying it
end
