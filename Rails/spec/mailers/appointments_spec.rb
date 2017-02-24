require "rails_helper"

RSpec.describe AppointmentsMailer, type: :mailer do
  it "sends email to sidekiq mailer queue" do
    expect {
      AppointmentsMailer.new_appointment_created.deliver_later
  }.to have_enqueued_job.on_queue('mailers')
  end

  it "changes enqueued job size by one" do
    expect {
      AppointmentsMailer.new_appointment_created.deliver_later
    }.to change(ActiveJob::Base.queue_adapter.enqueued_jobs, :size).by(1)
  end

  it "new_appointment_created is sent to radetailing" do
    assert_no_enqueued_jobs
    assert_no_performed_jobs

    admin_user = FactoryGirl.create(:user)
    service = FactoryGirl.create(:service)
    appointment = FactoryGirl.create(:appointment, service: service)

    perform_enqueued_jobs do
      AppointmentsMailer.new_appointment_created(appointment).deliver_later
      assert_performed_jobs 1
    end

    to = ActionMailer::Base.deliveries.last.to[0]
    from = ActionMailer::Base.deliveries.last.from[0]

    expect(to).to eq("info@radetailing.ca")
    expect(from).to eq("no-reply@radetailing.ca")
  end

  it "new_appointment_created is sent to capstone team" do
    assert_no_enqueued_jobs
    assert_no_performed_jobs

    admin_user = FactoryGirl.create(:user)
    service = FactoryGirl.create(:service, id: 0)
    service.save
    appointment = FactoryGirl.create(:appointment, service: service)
    appointment.save

    perform_enqueued_jobs do
      AppointmentsMailer.new_appointment_created(appointment).deliver_later
      assert_performed_jobs 1
    end

    to = ActionMailer::Base.deliveries.last.to[0]
    from = ActionMailer::Base.deliveries.last.from[0]

    expect(to).to eq("seg-radetailing-capstone-team@gmail.com")
    expect(from).to eq("no-reply@radetailing.ca")
    expect(ActionMailer::Base.deliveries.last.subject).to eq("New RADetailing Appointment Created - FAILURE #{appointment.id}")
  end
end
