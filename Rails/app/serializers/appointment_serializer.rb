class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :day, :month, :year, :start_time, :end_time, :status
  belongs_to :car
end
