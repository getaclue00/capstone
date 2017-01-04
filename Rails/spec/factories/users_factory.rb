FactoryGirl.define do
  factory :user do
    email {|n| "email#{n}@test.com"} #appended n to make it unique
    password "password"
    first_name "Tester"
    last_name "Testing"	
    telephone "000-000-0000"
    admin true
    association (:employee)
  end
end
#not setting employee attribute because RAILS confuses the employee_id with this