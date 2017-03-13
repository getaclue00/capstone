class CompanyPreferenceSerializer < ActiveModel::Serializer
  attributes :id, :workMonday, :mondayOpen, :mondayClose, :workTuesday, :tuesdayOpen, :tuesdayClose, :workWednesday, :wednesdayOpen, :wednesdayClose, :workThursday, :thursdayOpen, :thursdayClose, :workFriday, :fridayOpen, :fridayClose, :workSaturday, :saturdayOpen, :saturdayClose, :workSunday, :sundayOpen, :sundayClose
  belongs_to :employee
end
