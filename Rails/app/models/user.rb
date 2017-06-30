class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  before_save :ensure_authentication_token

  belongs_to :employee
  validate :ensure_one_admin_remains, on: :update

  def ensure_authentication_token
    if authentication_token.blank?
     self.authentication_token = generate_authentication_token
    end
  end

  private
    def generate_authentication_token
      loop do
       token = Devise.friendly_token
       break token unless User.where(authentication_token: token).first
      end
    end

    def ensure_one_admin_remains
      unless !self.admin? && User.where(admin: true).count > 1
        errors.add(:admin, "need at least 1 administrator")
      end
    end
end
