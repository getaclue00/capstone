class Company < ApplicationRecord
  has_many :employee, dependent: :nullify
end
