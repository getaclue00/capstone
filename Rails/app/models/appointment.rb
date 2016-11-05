class Appointment < ApplicationRecord
	validates :status, inclusion: { in: %w(pending confirmed new\ time\ proposed completed cancelled),
    message: "Please enter a valid status: pending, confirmed, new time proposed, completed or cancelled" }
	belongs_to :car, optional: true #belongs_to is used in the model that is to contain the FK
	belongs_to :service, optional: true
	belongs_to :employee, optional: true #appointment may not have employee assigned at time of creation
  #this is needed because belongs_to defailt behaviour doesnt allow this
end

#NOTE: Once we set up the Ember to pass car and service id, get rid of the "optional true" for those 2

