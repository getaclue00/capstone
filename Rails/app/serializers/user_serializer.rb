class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :admin #not returning password
  belongs_to :employee
end
