class CompanyPreferenceSerializer < ActiveModel::Serializer
  attributes :id, :work_monday, :monday_open, :monday_close, :work_tuesday, :tuesday_open, :tuesday_close, :work_wednesday, :wednesday_open, :wednesday_close, :work_thursday, :thursday_open, :thursday_close, :work_friday, :friday_open, :friday_close, :work_saturday, :saturday_open, :saturday_close, :work_sunday, :sunday_open, :sunday_close
  belongs_to :employee
end
