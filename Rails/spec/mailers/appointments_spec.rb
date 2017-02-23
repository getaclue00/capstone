require "rails_helper"

RSpec.describe AppointmentsMailer, type: :mailer do
  # pending "add some examples to (or delete) #{__FILE__}"
  it "sends email to sidekiq" do
    expect {
      AppointmentsMailer.new_appointment_created.deliver_later!
  }.to have_enqueued_job.on_queue('mailers')
  end

  it "new_appointment_created is sent" do
    expect(Sidekiq::Extensions::DelayedMailer.jobs.size).to eq(0)
    AppointmentsMailer.delay.new_appointment_created
    expect(Sidekiq::Extensions::DelayedMailer.jobs.size).to eq(1)
  end

  it "new_appointment_created is sent" do
    perform_enqueued_jobs do
      AppointmentsMailer.new_appointment_created.deliver_later!(wait: 10.seconds)
    end

    to = ActionMailer::Base.deliveries.last.to[0]
    from = ActionMailer::Base.deliveries.last.from[0]

    expect(to).to eq("info@radetailing.ca")
    expect(from).to eq("no-reply@radetailing.ca")
  end
end
