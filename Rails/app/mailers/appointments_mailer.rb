class AppointmentsMailer < ApplicationMailer
  def new_appointment_created
    @user = User.find_by_admin(true)

    mail(from: 'no-reply@radetailing.ca',
         to: 'info@radetailing.ca',
         body: "Testing email settings",
         subject: "New RADetailing Appointment Created")
  end
end
