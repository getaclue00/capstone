FactoryGirl.define do
  factory :service do
    name "serviceA"
    price_small 120.0
    price_large 250.0
    duration 2.0
    description "This is a description"
    active true
    #default displayable is false
       
  factory :service_with_appointment do
    after(:create) do |service|
      create(:appointment, service: service)
    end
  end
  end
end
