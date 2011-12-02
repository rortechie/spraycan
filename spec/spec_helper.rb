# Configure Rails Environment
ENV["RAILS_ENV"] = "test"
require File.expand_path("../dummy/config/environment.rb", __FILE__)
require 'rspec'
require 'rspec/rails'
require 'factory_girl'
require 'spec/factories'
require 'fileutils'
require 'capybara/rspec'

Rails.backtrace_cleaner.remove_silencers!

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

RSpec.configure do |config|
  config.mock_framework = :rspec

  config.use_transactional_fixtures = false

  config.before(:suite) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end

def load_theme(theme)
  visit "/spraycan"
  within("tr[data-id='#{theme.id}']") { click_link "Load" }
end
