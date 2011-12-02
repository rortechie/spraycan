class Spraycan::ViewOverride < ActiveRecord::Base
  belongs_to :theme
  after_save :initiate

  def initiate
    if self.target == 'set_attributes'
      #have to parse string to safely get the hash keys +   values
      parse = self.replacement
      self.replacement = {}

      parse.gsub! /\A\{|\}\z/, ''
      parse.split(",").each do |pair|
        parts = pair.split "=>"
        next unless parts.size == 2

        self.replacement[parts[0].strip.gsub(/\A:/, '').to_sym] = parts[1].strip.gsub(/\A['"]|['"]\z/, '') rescue nil
      end

      self.replace_with = 'attributes'
    end

    Deface::Override.new( :from_editor => true,
                          :virtual_path => self.virtual_path,
                          :name => self.name,
                          self.target.to_sym => self.selector,
                          :closing_selector => self.closing_selector,
                          self.replace_with.to_sym => self.replacement,
                          :disabled => self.disabled,
                          :sequence =>  (self.sequence_target.blank? ? 100 : {self.sequence.to_sym => self.sequence_target}))
  end
end
