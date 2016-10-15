class EmployeesController < ApplicationController

	def index
		@employees_array=Employee.all
	end

	def show
		@employee=Employee.find params[:id]
	end

	def new
		@employee=Employee.new
	end

	def create
		@employee=Employee.new(employee_sanitized_params)
		@employee.start_date = Date.new(params[:employee]["start_date(1i)"].to_i,params[:employee]["start_date(2i)"].to_i,params[:employee]["start_date(3i)"].to_i)

		if(@employee.save)
			redirect_to("/employees/#{@employee.id}")
		else
			render ("new")
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
		params.require(:employee).permit(:last_name, :first_name, :email, :phone_number, :street_number, :street_name, :city, :province, :postal_code, :is_admin, :startDate)
	end

end