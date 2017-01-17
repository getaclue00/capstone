FactoryGirl.define do
  factory :employee do
    last_name "Radwan"
    first_name "Nada"
    phone_number "345-468-3444"
    street_number 45
    street_name "Bank street"
    city "Ottawa"
    province "Ontario"
    postal_code "H7H 5U5"
    start_date "2013-10-22"
    end_date "2015-11-19"
    notes "This is a note"
  
    factory :employee_with_appointment do
        after(:create) do |employee|
            create(:appointment, employee: employee)
        end
    end

    factory :employee_with_user do
        after(:create) do |employee|
            create(:user, employee: employee)
        end
    end
  end
end