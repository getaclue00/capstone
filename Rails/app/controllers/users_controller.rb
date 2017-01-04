class UsersController < ApplicationController
  def index
    if params[:filter].present? && params[:filter][:user_type].present?
      user_type = params[:filter][:user_type]
      if user_type == "employee"
        users_array = User.where(employee: true)
      end
    else
      users_array = User.all
    end

    if users_array && !users_array.empty?
      render json: users_array, status: :ok
    else
      render json: { error: 'No users exist' }, 	status: :bad_request
    end
  end

  def show
    begin 
      user=User.find params[:id]
      render json: user, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'This user does not exist' }, status: :not_found
    end
  end
end


    