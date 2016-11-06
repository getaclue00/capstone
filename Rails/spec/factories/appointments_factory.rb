FactoryGirl.define do
  factory :appointment do
    color "#AB00FF"
    text_color "#FFFFFF"
    title "New Appointment"
    start "2016-10-23 09:10:00"	
    notes "note"
    status "pending"
    association (:car)
    association (:service)
    association (:employee)
  end
end
