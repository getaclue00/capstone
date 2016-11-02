FactoryGirl.define do
	factory :car do
	    make "carMake"
	    model "carModel"
	    size "small"
	    interior "carInterior"
	    colour "carColour"
	    client_id "1"
	    association(:client)
  	end 
end