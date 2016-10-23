class EmployeesController < ApplicationController

	def index
		employees_array=Employee.all
		if employees_array && !employees_array.empty?
      		render json: employees_array, status: :ok
    	else
      		render json: { error: 'No employees exist' }, 	status: :bad_request
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
		@employee=Employee.new(employee_sanitized_params)
		#@employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)
		if(@employee.save)
			#location specifies where to find created resource
			render json: @employee, status: :created, location: @employee
		else
			render json: { error: 'Employee creation failed'}, status: :bad_request
		end
	end

	def update
		employee=Employee.find params[:id]
		#employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)
	
		if(employee.update(employee_sanitized_params))
			render json: employee, status: :created, location: employee
		else
			render json: { error: 'Employee update failed'}, status: :bad_request
		end
	end

	def destroy
		employee=Employee.find params[:id]
		employee.destroy
		render nothing: true, status: :ok
	end

	private

	def employee_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :is_admin, :start_date] )
	end

end
