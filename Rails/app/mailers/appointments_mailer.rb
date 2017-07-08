class AppointmentsMailer < ApplicationMailer

  AUTO_EMAIL_ADDRESS = 'info@radetailing.ca'
  DEV_EMAIL_ADDRESS = 'seg-radetailing-capstone-team@gmail.com'

  def new_appointment_created(appointment)
    @user = User.find_by(email: AUTO_EMAIL_ADDRESS)
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "New RADetailing Appointment Created")
      else
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "New RADetailing Appointment Created")
      end
    else
      mail(from: AUTO_EMAIL_ADDRESS,
           to: DEV_EMAIL_ADDRESS,
           subject: "New RADetailing Appointment Created - FAILURE #{@appointment.id}")
    end
  end

  def appointment_confirmed(appointment)
    @user = User.find_by(email: AUTO_EMAIL_ADDRESS)
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "RADetailing Appointment CONFIRMED")
      else
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "RADetailing Appointment CONFIRMED")
      end
    else
      mail(from: AUTO_EMAIL_ADDRESS,
           to: DEV_EMAIL_ADDRESS,
           subject: "RADetailing Appointment CONFIRMED - FAILURE #{@appointment.id}")
    end
  end

  def appointment_cancelled(appointment)
    @user = User.find_by(email: AUTO_EMAIL_ADDRESS)
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "RADetailing Appointment CANCELLED")
      else
        mail(from: AUTO_EMAIL_ADDRESS,
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "RADetailing Appointment CANCELLED")
      end
    else
      mail(from: AUTO_EMAIL_ADDRESS,
           to: DEV_EMAIL_ADDRESS,
           subject: "RADetailing Appointment CANCELLED - FAILURE #{@appointment.id}")
    end
  end
end
