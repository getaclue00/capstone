class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :employee

  before_save :ensure_authentication_token
  validate :ensure_admin_constraints

  MINIMUM_ADMINS_REQUIRED = 1

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

    def ensure_admin_constraints
      if self.admin_changed? && self.admin_changed?(from: true, to: false)
        ensure_admins_remain
      end
    end

    def ensure_admins_remain
      if User.where(admin: true).count == MINIMUM_ADMINS_REQUIRED
        errors.add(:admin, "need at least 1 administrator")
      end
    end
end
