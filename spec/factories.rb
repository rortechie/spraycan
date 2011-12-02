FactoryGirl.define do
  factory :stylesheet, :class => Spraycan::Stylesheet do
    name 'pretty.css'
    css  '.pretty{}'
    theme
  end

  factory :javascript, :class => Spraycan::Javascript do
    name 'magic.js'
    js 'alert("Its a kinda magic");'
    theme
  end

  factory :theme, :class => Spraycan::Theme do
    name   'Test Theme'
    active true
  end

end
