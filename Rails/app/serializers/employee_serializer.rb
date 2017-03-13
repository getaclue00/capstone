class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :start_date, :end_date, :notes
  has_many :appointments
  has_one :user
  has_one :company_preference
end
