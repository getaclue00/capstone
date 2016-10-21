class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :is_admin, :start_date
end
