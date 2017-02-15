class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :color, :text_color, :title, :start, :end, :notes, :status, :week_number, :cost
  belongs_to :service
  belongs_to :employee
  belongs_to :client
end
