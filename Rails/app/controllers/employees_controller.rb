class EmployeesController < ApplicationController

	def index
		employees_array=Employee.all
		render json: employees_array, status: :ok
	end

	def show
		employee=Employee.find params[:id]
		render json: employee, status: :ok
	end

	def new
		@employee=Employee.new
	end

	# def create
	# 	@employee=Employee.new(employee_sanitized_params)
	# 	@employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)

	# 	if(@employee.save)
	# 		redirect_to("/employees/#{@employee.id}")
	# 	else
	# 		render ("new")
	# 	end
	# end

	def create
		@employee=Employee.new(employee_attributes)
		@employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)

		if(@employee.save)
			#location specifies where to find created resource
			render json: @employee, status: :created, location: @employee
		else
			#respond_with_errors(@employee)
			render nothing: true, status: :bad_request
		end
	end

	def edit
		@employee=Employee.find params[:id]
	end

	def update
		employee=Employee.find params[:id]
		employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)
	
		if(employee.update(employee_sanitized_params))
			redirect_to("/employees/#{employee.id}")
		else
				@employee=employee
				render ("edit")
		end
	end

	def destroy
		employee=Employee.find params[:id]
		employee.destroy
		redirect_to "/employees"
	end

	private

	def employee_sanitized_params
		#params.require(:employee).permit(:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :is_admin, :startDate)
		params.require(:data).permit(:type, {attributes: [:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :is_admin, :startDate]})
	end

	def employee_attributes
		employee_sanitized_params[:attributes] || {}
	end

end