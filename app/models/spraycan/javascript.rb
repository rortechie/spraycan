class Spraycan::Javascript < ActiveRecord::Base

  belongs_to :theme

  def body
    self.js
  end
end
