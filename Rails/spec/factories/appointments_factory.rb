FactoryGirl.define do
  factory :appointment do
    color "#AB00FF"
    text_color "#FFFFFF"
    title "New Appointment"
    start Time.now
    week_number Time.now.strftime("%U").to_i
    notes "note"
    status "pending"
    association (:car)
    association (:service)
    association (:employee)
  end
end
