class Service < ApplicationRecord
	before_destroy :get_associated_objects

	#destroying a service shouldnt destroy associated appointments (only sets FK to id 0)
	has_many :appointments, dependent: :nullify

	def get_associated_objects
        apts_array = Service.find(self[:id]).appointment_ids
        for i in 0.. apts_array.size-1
            Appointment.update(apts_array[i], :service_id => '0')
        end
    end
end
