FactoryGirl.define do
	factory :client do
		last_name "test"
	  	first_name "test"
	  	email {|n| "email#{n}@test.com"} #appended n to make it unique
	 	  phone_number "000-000-0000"
	  	street "45 test"
	  	postal_code "A0A 0A0"
	  	city "Ottawa"
	  	province "Ontario"

	  	factory :client_with_appointment do
	    	after(:create) do |client|
	      		create(:appointment, client: client)
	    	end
	  	end
	end
end
