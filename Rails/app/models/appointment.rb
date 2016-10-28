class Appointment < ApplicationRecord
	validates :day, numericality: { :only_integer => true, :less_than_or_equal_to => 31, :greater_than_or_equal_to => 1}
	validates :month, numericality: { :only_integer => true, :less_than_or_equal_to => 12, :greater_than_or_equal_to => 1}
	validates :year, numericality: { :only_integer => true, :greater_than_or_equal_to => 2016}, length: { :is => 4 } #4 digits
	belongs_to :car
end
