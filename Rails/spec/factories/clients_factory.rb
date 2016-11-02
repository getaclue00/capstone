FactoryGirl.define do
	factory :client do
		last_name "test"
	  	first_name "test"
	  	email {|n| "email#{n}"} #appended n to make it unique
	 	phone_number "000-000-0000"
	  	street_number "45"
	  	street_name "test"
	  	postal_code "A0A 0A0"

	factory :client_with_car do
    	after(:create) do |client|
      		create(:car, client: client)
    	end
  	end
	end
end