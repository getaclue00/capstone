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
	    begin
	        appointment=Appointment.new(appointment_sanitized_params)
	        puts"appointment sanitized params is"
	        puts appointment_sanitized_params
	        puts json: appointment
	        if appointment.save!
	  			render json: appointment, status: :created
	  		else
	  			render json: { error: 'Appointment creation failed. Check your data.'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	      render json: { error: 'Appointment creation failed.'}, status: :bad_request
	    rescue ActiveRecord::StatementInvalid => e
	      render json: { error: 'Appointment creation failed. Check your data.'}, status: :bad_request
	    rescue ActiveRecord::RecordInvalid => e
	      render json: { error: 'Appointment associations not respected. Check your data.'}, status: :bad_request
		end
	end

	def update
	    begin
			appointment=Appointment.find params[:id]
	        if appointment.update!(appointment_sanitized_params)
	  			render json: appointment, status: :ok
	  		else
	  			render json: { error: 'Appointment update failed'}, status: :bad_request
	  		end
	    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
	        render json: { error: 'Appointment update failed'}, status: :bad_request
		rescue ActiveRecord::RecordNotFound => e
				render json: { error: 'No such appointment exists' }, status: :not_found
		end
	end

	def destroy
	    begin
			appointment=Appointment.find params[:id]
			# appointment.status="deleted"
			# appointment.save
			appointment.destroy
			head :no_content
		rescue ActiveRecord::RecordNotFound => e
			render json: { error: 'No such appointment exists' }, status: :not_found
		end
	end


	#anything beneath the key word private is private
	private

		def appointment_sanitized_params
		#take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that
		#can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
		# whereas the "safe" version simply returns an empty hash.
		ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:color, :text_color, :title, :start, :end, :notes, :status, :service, :car, :employee] )
	end

end
