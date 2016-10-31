class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :color, :text_color, :title, :start, :end, :notes, :status
  belongs_to :car
  belongs_to :service
  belongs_to :employee, optional: true #appointment may not have employee assigned at time of creation
  #this is needed because belongs_to default behaviour doesnt allow this 
end
