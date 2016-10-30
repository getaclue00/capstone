class Service < ApplicationRecord
	#destroying a service shouldnt destroy associated appointments
	has_many :appointments, dependent: :nullify  # updates the associated records foreign
                                              # key value to NULL rather than destroying it
end
