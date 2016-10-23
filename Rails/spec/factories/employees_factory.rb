FactoryGirl.define do
  factory :employee do
    last_name "Radwan"
    first_name "Nada"
    email "hgt34@gmail.com"
    phone_number "345-468-3444"
    street_number 45
    street_name "Bank street"
    city "Ottawa"
    province "Ontario"
    postal_code "H7H 5U5"
    start_date "2013-10-22"
    is_admin true
  end

  # #uses the :employee factory as a parent. It replaces the specified attributes (in this case, street_number with its own; everything else will defer to the original :employee factory.
  # factory :invalid_employee, parent: :employee
  # 	street_number "hh"
  # end

end