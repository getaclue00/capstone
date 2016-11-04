FactoryGirl.define do
	factory :car do
	    make "carMake"
	    model "carModel"
	    size "small"
	    interior "carInterior"
	    colour "carColour"
	    association(:client)
  	end 
end