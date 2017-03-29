class Client < ApplicationRecord
	before_destroy :get_associated_objects
	#ActiveRecord superclass provides setters and getters and methods to access & modify db table

	validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/,
    message: "is invalid (please use 000-000-0000)"  }

    validates :postal_code, format: { with: /[A-Z][0-9][A-Z](\s|)[0-9][A-Z][0-9]/,
    message: "is invalid (please use A1F 3E2)" }

    validates :email, format: { with: /.+@.+\..+/,
    message: "is invalid" }

    #destroying a client shouldnt destroy associated appointments (only sets FK to id 0)
	has_many :appointments, dependent: :nullify

    def get_associated_objects
        apts_array = Client.find(self[:id]).appointment_ids
	    for i in 0.. apts_array.size-1
	        Appointment.update(apts_array[i], :client_id => '0')
	    end
    end
end
