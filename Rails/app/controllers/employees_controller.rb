class EmployeesController < ApplicationController

	#actions
	#render is implicit for all actions since name of action and view are the same

	def index
		employees_array=Employee.all
		if employees_array && !employees_array.empty?
      		render json: employees_array, status: :ok
    	else
      		render json: { error: 'No employees exist' }, status: :bad_request
    	end
	end

	def show
		begin 
			employee=Employee.find params[:id]
			render json: employee, status: :ok
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'This employee does not exist' }, status: :not_found
		end
	end

	def create
		begin
	        employee=Employee.new(employee_sanitized_params)
	        if employee.save!
	  			render json: employee, status: :created
	  		else
	  			render json: { error: 'Employee creation failed. Check your data.'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	      render json: { error: 'Employee creation failed. No parameters sent.'}, status: :bad_request
	    rescue ActiveRecord::StatementInvalid => e #thrown when violations in migrations are violated
	      render json: { error: 'Employee creation failed. Check your data.'}, status: :bad_request
	    rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
	      render json: { error: employee.errors.messages}, status: :bad_request
		end
	end

	def update
		begin
			employee=Employee.find params[:id]
	        if employee.update!(employee_sanitized_params)
	  			render json: employee, status: :ok
	  		else
	  			render json: { error: 'Employee update failed. Check your data.'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	        render json: { error: 'Employee update failed. No parameters sent.'}, status: :bad_request
		rescue ActiveRecord::RecordNotFound => e
				render json: { error: 'No such employee exists' }, status: :not_found
		rescue ActiveRecord::RecordInvalid => e  #thrown when validations in model are violated 
	      render json: { error: employee.errors.messages}, status: :bad_request
		end
	end

	def destroy
		begin
			employee=Employee.find params[:id]
			employee.destroy
			head :no_content
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'No such employee exists' }, status: :not_found
		end
	end


	#anything beneath the key word private is private
	private 

		def employee_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :start_date, :end_date, :is_admin, :notes] )
	end
end

  