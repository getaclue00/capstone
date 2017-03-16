class Appointment < ApplicationRecord
  has_paper_trail :on => [:update]#needed to track versions, create events are useless and we never delete

	validates :status, inclusion: { in: %w(pending confirmed new\ time\ proposed completed cancelled),
    message: "Please enter a valid status: pending, confirmed, new time proposed, completed or cancelled" }
	belongs_to :service
	belongs_to :employee #appointment may not have employee assigned at time of creation (default value set in migration)
	belongs_to :client
end


