class ViewOverride < ActiveRecord::Base
  belongs_to :theme
  after_save :initiate

  def initiate
    Deface::Override.new( :virtual_path => self.virtual_path,
                          :name => self.name,
                          self.target.to_sym => self.selector,
                          :closing_selector => self.closing_selector,
                          self.replace_with.to_sym => self.replacement,
                          :disabled => self.disabled,
                          :sequence =>  (self.sequence_target.blank? ? 100 : {self.sequence.to_sym => self.sequence_target}))
  end
end
