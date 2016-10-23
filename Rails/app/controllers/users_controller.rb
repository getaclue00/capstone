class UsersController < ApplicationController
  def index
    if params[:filter].present? && params[:filter][:user_type].present?
      user_type = params[:filter][:user_type]
      if user_type == "employee"
        users = User.where(employee: true)
      end
    else
      users = User.all
    end

    if users && !users.empty?
      render json: users, status: :ok
    else
      render json: { error: 'bad request' }, 	status: :bad_request
    end
  end

  def show
    user = User.find_by_id(params[:id])
    if user
      render json: user, status: :ok
    else
      render json: { error: 'this user does not exist' }, 	status: :not_found
    end
  end
end
