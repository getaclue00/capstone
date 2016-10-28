class Service < ApplicationRecord
	#destroying a service shouldnt destroy associated appointments
	has_many :appointments
end
