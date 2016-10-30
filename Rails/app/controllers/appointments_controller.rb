class AppointmentsController < ApplicationController
	def index
		appointments_array=Appointment.all
		if appointments_array && !appointments_array.empty?
      		render json: appointments_array, status: :ok
    	else
      		render json: { error: 'No appointments exist' }, status: :bad_request
    	end
	end

	def show
		begin 
			appointment=Appointment.find params[:id]
			render json: appointment, status: :ok
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'This appointment does not exist' }, status: :not_found
		end
	end

	def create
		@appointment=Appointment.new(appointment_sanitized_params)
		if(@appointment.save)
			render json: @appointment, status: :created
		else
			render json: { error: 'Appointment creation failed'}, status: :bad_request
		end
	end

	def update
		appointment=Appointment.find params[:id]
		if(appointment.update(appointment_sanitized_params))
			render json: appointment, status: :ok
		else
			render json: { error: 'Appointment update failed'}, status: :bad_request
		end
	end

	def destroy
		appointment=Appointment.find params[:id]
		appointment.destroy
		head :no_content
	end


	#anything beneath the key word private is private
	private 

		def appointment_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that 
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:day, :month, :year, :start_time, :end_time, :status] )
	end

end

  