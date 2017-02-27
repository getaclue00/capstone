class AppointmentsMailer < ApplicationMailer
  def new_appointment_created(appointment)
    @user = User.create(email: 'info@radetailing.ca')
    @appointment = appointment
    @employee_user = User.where('employee_id = ?', appointment.employee.id).first

    if @appointment.is_valid?
      mail(from: 'no-reply@radetailing.ca',
           to: @user.email,
           bcc: @employee_user.email,
           subject: "New RADetailing Appointment Created")
    else
      mail(from: 'no-reply@radetailing.ca',
           to: 'seg-radetailing-capstone-team@gmail.com',
           subject: "New RADetailing Appointment Created - FAILURE #{@appointment.id}")
    end
  end
end
