class SessionController < ApplicationController
  def csrf
    render json: { csrf: form_authenticity_token }
  end
end
