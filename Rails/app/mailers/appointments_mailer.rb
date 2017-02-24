class AppointmentsMailer < ApplicationMailer
  def new_appointment_created(appointment)
    @user = User.create(email: 'info@radetailing.ca')
    @appointment = appointment

    if @appointment.is_valid?
      mail(from: 'no-reply@radetailing.ca',
           to: @user.email,
           subject: "New RADetailing Appointment Created")
    else
      mail(from: 'no-reply@radetailing.ca',
           to: 'seg-radetailing-capstone-team@gmail.com',
           subject: "New RADetailing Appointment Created - FAILURE #{@appointment.id}")
    end
  end
end
