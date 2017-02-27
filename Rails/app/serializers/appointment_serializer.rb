class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :color, :text_color, :title, :start, :end, :notes, :status, :week_number, :cost, :location
  belongs_to :car
  belongs_to :service
  belongs_to :employee
end
