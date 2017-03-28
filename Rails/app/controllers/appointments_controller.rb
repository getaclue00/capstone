class AppointmentsController < ApplicationController
  before_action :authenticate_user_from_token!
  before_action :set_paper_trail_whodunnit #monitor who modified appointment in versions table

  def index
      begin

        select_week_year = params[:filter].present? && params[:filter][:week].present? && params[:filter][:year].present?
        get_versions = params[:version].present? && params[:version][:id].present?
        date_filter = params[:filter].present? && params[:filter][:date].present?
        employee_fitler = params[:filter].present? && params[:filter][:employee_id].present?

        # regardless of whether admin or not
        if select_week_year
          appointments_array=Appointment.where('week_number = ?', params[:filter][:week]).all
          if appointments_array && !appointments_array.empty?
            render json: appointments_array, status: :ok
          else
            render json: [], status: :ok
          end

        elsif date_filter && employee_fitler
          date = params[:filter][:date].split('-')
          start_time = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i).beginning_of_day
          end_time = DateTime.new(date[0].to_i, date[1].to_i, date[2].to_i).end_of_day
          appointments_array=Appointment.order(:start).where('(start BETWEEN ? AND ?) AND employee_id = ?', start_time, end_time, params[:filter][:employee_id]).all
          if appointments_array && !appointments_array.empty?
            render json: appointments_array, status: :ok
          else
            render json: [], status: :ok
          end

        # only admins can view all appointments (booking-history) or appointment versions
        elsif current_user && current_user.admin?
          if get_versions
            appointment=Appointment.find params[:version][:id] #to get appointment for which we require versions history
            prev=appointment.paper_trail.previous_version
            if prev #appointment has a previous version?
              appointments_array=Array.new(appointment.versions.length)
              for i in 0..appointment.versions.length-1
                  appointments_array[i]=prev
                  prev=prev.paper_trail.previous_version
              end
            end
            if appointments_array && !appointments_array.empty?
              render json: appointments_array, adapter: :json, status: :ok
            else
              render json: [], status: :ok
            end
          else
            appointments_array=Appointment.all
            if appointments_array && !appointments_array.empty?
              render json: appointments_array, status: :ok
            else
              render json: [], status: :ok
            end
          end

        # not admin and not requesting to see appointments of certain week
        else
          render json: { error: 'Not Authorized' }, status: 401
        end
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: 'No such appointment exists' }, status: :not_found
      end
    end

  def show
    begin
      appointment=Appointment.find params[:id]
      render json: appointment, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'No such appointment exists' }, status: :not_found
    end
  end

  def create
    begin
      sanitized_params = appointment_sanitized_params
      #setting employee to default employee
      if sanitized_params[:employee_id].nil?
        sanitized_params[:employee_id] = 0
      end

      @appointment = Appointment.new(sanitized_params)

      if @appointment.save!
        AppointmentsMailer.new_appointment_created(@appointment).deliver_later
        render json: @appointment, status: :created
      else
        render json: { error: 'Appointment creation failed. Check your data.'}, status: :bad_request
      end
    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
      render json: { error: 'Appointment creation failed. No parameters sent.'}, status: :bad_request
    rescue ActiveRecord::StatementInvalid => e
      render json: { error: 'Appointment creation failed. Check your data.'}, status: :bad_request
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: @appointment.errors.messages}, status: :bad_request
    end
  end

  def update
    begin
      appointment=Appointment.find params[:id]
      sanitized_params = appointment_sanitized_params

      if sanitized_params[:employee_id] == nil
        sanitized_params[:employee_id] = 0
      end

      if appointment.update!(sanitized_params)
        render json: appointment, status: :ok
      else
        render json: { error: 'Appointment update failed'}, status: :bad_request
      end
    rescue ActiveModelSerializers::Adapter::JsonApi::Deserialization::InvalidDocument => e
      render json: { error: 'Appointment update failed. No parameters sent.'}, status: :bad_request
    rescue ActiveRecord::RecordNotFound => e
      render json: { error: 'No such appointment exists' }, status: :not_found
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: appointment.errors.messages}, status: :bad_request
    rescue ActiveRecord::StatementInvalid => e
     render json: { error: 'Appointment update failed. Check your data.'}, status: :bad_request
    end
  end

  def destroy
    if current_user && current_user.admin?
      begin
        appointment=Appointment.find params[:id]
        appointment.destroy
        head :no_content
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: 'No such appointment exists' }, status: :not_found
      end
    else
      render json: { error: 'Not Authorized' }, status: 401
    end
  end


  private

  def appointment_sanitized_params
    #take a Hash or an instance of ActionController::Parameters representing a JSON API payload, and return a hash that
    #can directly be used to create/update models. The ! version throws an InvalidDocument exception when parsing fails,
    # whereas the "safe" version simply returns an empty hash.
    ActiveModelSerializers::Deserialization.jsonapi_parse!(params, only: [:color, :text_color, :title, :start, :end, :notes, :status, :client, :service, :employee, :week_number, :cost, :location] )
  end

   def user_for_paper_trail
    # used for overriding the default "currentUser" and storing who did the change on the object
      current_user
  end

end
