class Employee < ActiveRecord::Base
    before_destroy :get_associated_objects 

    validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/,
    message: "Please enter a valid phone number 000-000-0000" } 

    validates :postal_code, format: { with: /[A-Z][0-9][A-Z](\s|)[0-9][A-Z][0-9]/,
    message: "Please enter a valid postal code G5G 6T6" } 

    #destroying a service shouldnt destroy associated appointments (only sets FK to id 0)
    has_many :appointments, dependent: :nullify

    def get_associated_objects
        apts_array = Employee.find(self[:id]).appointment_ids 
        for i in 0.. apts_array.size-1
            Appointment.update!(apts_array[i], :employee_id => '0')
        end
    end
end
