FactoryGirl.define do
  factory :company do
    work_monday false
    monday_open "MyString"
    monday_close "MyString"
    work_tuesday false
    tuesday_open "MyString"
    tuesday_close "MyString"
    work_wednesday false
    wednesday_open "MyString"
    wednesday_close "MyString"
    work_thursday false
    thursday_open "MyString"
    thursday_close "MyString"
    work_friday false
    friday_open "MyString"
    friday_close "MyString"
    work_saturday false
    saturday_open "MyString"
    saturday_close "MyString"
    work_sunday false
    sunday_open "MyString"
    sunday_close "MyString"
    employee nil
    contact_email "MyString"
    contact_phone_number "MyString"
  end
end
