module DefaceEditor
  class Configuration

    # Holds a proc which should be called. If the returned value is
    # true then user is granted the access. Otherwise access is denied.
    attr_writer :is_enabled

    # Holds a proc which should be called. If the returned value is
    # true then user is granted the access. Otherwise access is denied.
    attr_writer :is_allowed_to_edit


    def is_enabled
      return lambda {|controller| return true } if Rails.env.development?
      @is_enabled || lambda {|_| nil }
    end

    def is_allowed_to_edit
      return lambda {|controller| return true } if Rails.env.development?
      @is_allowed_to_edit || lambda {|_| nil }
    end

    def initialize
      @is_enabled               = nil
      @is_allowed_to_edit       = nil
    end

  end

end

