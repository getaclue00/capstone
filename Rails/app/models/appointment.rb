class Appointment < ApplicationRecord

	validates :status, inclusion: { in: %w(pending confirmed new\ time\ proposed completed cancelled),
    message: "Please enter a valid status: pending, confirmed, new time proposed, completed or cancelled" }
	belongs_to :car, optional: true #belongs_to is used in the model that is to contain the FK
	belongs_to :service
	belongs_to :employee #appointment may not have employee assigned at time of creation (default value set in migration)

  def is_valid?
    self.service != nil && self.employee != nil && self.service.id != 0 && self.employee.id != 0
  end

end

#NOTE: Once we set up the Ember to pass car and service id, get rid of the "optional true" for those 2
