class Employee < ActiveRecord::Base
    before_destroy :get_associated_objects 
    after_destroy :set_appointments_fk

    validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/,
    message: "Please enter a valid phone number 000-000-0000" } 

    validates :postal_code, format: { with: /[A-Z][0-9][A-Z] [0-9][A-Z][0-9]/,
    message: "Please enter a valid postal code G5G 6T6" } 

    has_many :appointments,dependent: :nullify# updates the associated records foreign
                                              # key value to NULL rather than destroying it (this is changed in after_destroy)
   
    @apts_array=[] #array to keep track associated appointment ids


    def set_appointments_fk
        for i in 0.. @apts_array.size-1
            puts "Value of local variable is #{i}"
            Appointment.update(@apts_array[i], :employee_id => '0')
        end
    end

    def get_associated_objects
        @apts_array = Employee.find(self[:id]).appointment_ids 
    end
end
