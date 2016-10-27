class Car < ApplicationRecord
	belongs_to :client #belongs_to used for model with FK
	has_many :appointments, dependent: :destroy 
end
