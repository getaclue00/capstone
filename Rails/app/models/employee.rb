class Employee < ApplicationRecord
    before_destroy :get_associated_objects

    has_many :appointments, dependent: :nullify
    has_one :user, dependent: :destroy
    has_one :company_preference, dependent: :destroy
    belongs_to :company

    after_create :create_company_preference

    validates :company, presence: true
    validates :phone_number, format: { with: /\d{3}-\d{3}-\d{4}/,
    message: "is invalid (please use 000-000-0000)" }, :allow_blank => true
    validates :postal_code, format: { with: /[A-Z][0-9][A-Z](\s|)[0-9][A-Z][0-9]/,
    message: "is invalid (please use A1F 3E2)" }, :allow_blank => true

    def get_associated_objects
        apts_array = Employee.find(self[:id]).appointment_ids
        for i in 0.. apts_array.size-1
            Appointment.update(apts_array[i], :employee_id => '0')
        end
    end
end
