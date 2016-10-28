class Car < ApplicationRecord
	validates :size, inclusion: { in: %w(small medium large),
    message: "Please enter a valid size: small, medium or large" }

	belongs_to :client #belongs_to used for model with FK
	has_many :appointments, dependent: :destroy 
end
