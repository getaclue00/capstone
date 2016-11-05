FactoryGirl.define do
  factory :employee do
    last_name "Radwan"
    first_name "Nada"
    email {|n| "email#{n}"} #appended n to make it unique
    phone_number "345-468-3444"
    street_number 45
    street_name "Bank street"
    city "Ottawa"
    province "Ontario"
    postal_code "H7H 5U5"
    start_date "2013-10-22"
    is_admin true
  
    factory :employee_with_appointment do
    after(:create) do |employee|
      create(:appointment, employee: employee)
    end
  end
  end
end