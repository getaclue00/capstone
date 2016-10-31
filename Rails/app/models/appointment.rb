class Appointment < ApplicationRecord
	validates :status, inclusion: { in: %w(pending accepted completed deleted),
    message: "Please enter a valid status: pending, accepted, completed or deleted" }
	belongs_to :car #belongs_to is used in the model that is to contain the FK
	belongs_to :service
	belongs_to :employee, optional: true #appointment may not have employee assigned at time of creation
  #this is needed because belongs_to defailt behaviour doesnt allow this
end
