require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Detailing
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # as per http://stackoverflow.com/a/28344328

    config.generators do |g|
      g.test_framework :rspec, views: false, request_specs: false, routing_specs: false
      g.assets false
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.template_engine false
      g.fixture_replacement :factory_girl, dir: "spec/factories"
    end

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
          :headers => :any,
          :methods => [:get, :post, :delete, :put, :patch, :options, :head]
      end
    end
  end
end
