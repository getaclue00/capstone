class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :admin
  belongs_to :employee
end
