class ApplicationMailer < ActionMailer::Base
  # default from: 'from@example.com'
  layout 'mailer'
  add_template_helper(EmailHelper)
end
