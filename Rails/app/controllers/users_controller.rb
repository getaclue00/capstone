class UsersController < ApplicationController
  def index
    # change logic to check for admin vs not where isAdmin is obtained from employee table

    if params[:filter].present? && params[:filter][:user_type].present?
      user_type = params[:filter][:user_type]
      if user_type == "admin"
        users_array = User.where(admin: true)
      elsif user_type == "employee"
          users_array = User.where(admin: false)
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

  def create
    begin
          user=User.new(user_sanitized_params)
          if user.save!
          render json: user, status: :created
        else
          render json: { error: 'User creation failed. Check your data.'}, status: :bad_request
        end
      rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
        render json: { error: 'User creation failed. No parameters sent.'}, status: :bad_request
      rescue ActiveRecord::StatementInvalid => e #thrown when migration restriction or FK constraint not respected; if admin is null
        render json: { error: 'User creation failed. Check your data.'}, status: :bad_request
      rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
        render json: { error: user.errors.messages}, status: :bad_request
    end
  end

  def update
    begin
      user=User.find params[:id]
        if user.update!(user_sanitized_params)
          render json: user, status: :ok
        else
          render json: { error: 'User update failed. Check your data.'}, status: :bad_request
        end
    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
      render json: { error: 'User update failed. No parameters sent.'}, status: :bad_request
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'No such user exists' }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
      render json: { error: user.errors.messages}, status: :bad_request
    rescue ActiveRecord::StatementInvalid => e #thrown when migration restriction or FK constraint not respected; if admin is null
      render json: { error: 'User update failed. Check your data.'}, status: :bad_request
    end
  end

  private 

  def user_sanitized_params
    ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:email, :password, :admin, :employee] )
  end
end

    