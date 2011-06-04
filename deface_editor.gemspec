Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'deface_editor'
  s.version     = '0.2.0'
  s.summary     = 'GUI editor for managing Deface::Overrides'
  #s.description = 'Add (optional) gem description here'
  s.required_ruby_version = '>= 1.8.7'

  # s.author            = 'David Heinemeier Hansson'
  # s.email             = 'david@loudthinking.com'
  # s.homepage          = 'http://www.rubyonrails.org'
  # s.rubyforge_project = 'actionmailer'

  s.files        = Dir['CHANGELOG', 'README.md', 'LICENSE', 'lib/**/*', 'app/**/*']
  s.require_path = 'lib'
  s.requirements << 'none'

  s.has_rdoc = true

  #s.add_dependency('deface', '0.2.0')
  s.add_dependency('carrierwave', '0.5.4')
  s.add_dependency('guid', '0.1.1')
  s.add_dependency('acts_as_list', '= 0.1.2')
end
