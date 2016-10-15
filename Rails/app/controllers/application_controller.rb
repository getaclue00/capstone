class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  before_filter :authenticate_user_from_token!
  protect_from_forgery with: :exception
end
