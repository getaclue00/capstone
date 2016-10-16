class SessionsController < Devise::SessionsController
  # rewrote some of the methods to how we need them
  # https://github.com/plataformatec/devise/blob/master/app/controllers/devise/sessions_controller.rb
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    yield resource if block_given?
    if request.format.json?
      data = {
        token: self.resource.authentication_token,
        email: self.resource.email,
        user_id: self.resource.id
      }
      render json: data, status: 201 and return
    else
      head :no_content
    end
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    yield if block_given?
    respond_to_on_destroy
  end

  private
    def verify_signed_out_user
      if all_signed_out?
        respond_to_on_destroy
      end
    end

    def respond_to_on_destroy
      head :no_content
    end
end
