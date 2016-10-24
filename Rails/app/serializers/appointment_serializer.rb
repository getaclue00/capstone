class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :color, :text_color, :title, :start, :end, :notes
end
