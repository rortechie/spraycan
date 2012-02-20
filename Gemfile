source :rubygems
 
gemspec

#stuff needed for dummy app
group :test do
  gem 'sqlite3'
  gem 'jquery-rails'
  gem 'capybara'#, :git => 'git://github.com/jnicklas/capybara.git'
  gem 'launchy'

  #from assets groups for dummy app
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'ruby-debug'
end

#keeps db cleaner happy to be outside :test group
gem 'database_cleaner'
gem 'spree', :path => '../spree' #only required for preferences
