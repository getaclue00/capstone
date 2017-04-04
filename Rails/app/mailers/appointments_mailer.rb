class AppointmentsMailer < ApplicationMailer
  def new_appointment_created(appointment)
    @user = User.create(email: 'info@radetailing.ca')
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "New RADetailing Appointment Created")
      else
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "New RADetailing Appointment Created")
      end
    else
      mail(from: 'no-reply@radetailing.ca',
           to: 'seg-radetailing-capstone-team@gmail.com',
           subject: "New RADetailing Appointment Created - FAILURE #{@appointment.id}")
    end
  end

  def appointment_confirmed(appointment)
    @user = User.create(email: 'info@radetailing.ca')
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "RADetailing Appointment CONFIRMED")
      else
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "RADetailing Appointment CONFIRMED")
      end
    else
      mail(from: 'no-reply@radetailing.ca',
           to: 'seg-radetailing-capstone-team@gmail.com',
           subject: "RADetailing Appointment CONFIRMED - FAILURE #{@appointment.id}")
    end
  end

  def appointment_cancelled(appointment)
    @user = User.create(email: 'info@radetailing.ca')
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      if @employee_user && @employee_user.email
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: [@employee_user.email, @appointment.client.email],
             subject: "RADetailing Appointment CANCELLED")
      else
        mail(from: 'no-reply@radetailing.ca',
             to: @user.email,
             bcc: @appointment.client.email,
             subject: "RADetailing Appointment CANCELLED")
      end
    else
      mail(from: 'no-reply@radetailing.ca',
           to: 'seg-radetailing-capstone-team@gmail.com',
           subject: "RADetailing Appointment CANCELLED - FAILURE #{@appointment.id}")
    end
  end
end
