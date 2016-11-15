FactoryGirl.define do
	factory :car do
	    make "carMake"
	    model "carModel"
	    size "small"
	    interior "carInterior"
	    colour "carColour"
	    association(:client)

	factory :car_with_appointment do
    	after(:create) do |car|
      		create(:appointment, car: car)
    	end
  	end
  	end 
end