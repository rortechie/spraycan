class Theme < ActiveRecord::Base
  has_many :view_overrides
  has_many :stylesheets

  scope :active, where(:active => true)
end
