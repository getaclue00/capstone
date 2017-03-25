class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  before_action :authenticate_user_from_token!
  protect_from_forgery unless: -> { request.format.json? }

  def catch_all_404
    render plain: '404', status: 404
  end

  # as per https://gist.github.com/josevalim/fb706b1e933ef01e4fb6
  # This is temporary, I will rewrite it to focus on headers instead
  private
    def authenticate_user_from_token!
      authenticate_with_http_token do |token, options|
        user_email = options[:email].presence
        user = user_email && User.find_by_email(user_email)

        if user && Devise.secure_compare(user.authentication_token, token)
          sign_in user, store: false
        end
      end
    end
end
