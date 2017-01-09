FactoryGirl.define do
  factory :user do
    email {|n| "email#{n}@test.com"} #appended n to make it unique
    password "password"
    admin true
    association (:employee)
  end
end
