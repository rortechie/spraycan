var ViewOverride = Backbone.Model.extend({
  toJSON: function() {
    var object = new Object;
    object['view_override'] = _.clone(this.attributes);
    return object;
  },

  klass: function(){
    return 'view_override'
  },

  defaults: {
    virtual_path: '', 
    target: 'replace', 
    disabled: false, 
    replace_with: 'text', 
    selector: '',
    sequence: 'before', 
    sequence_target: ''
  },

  url : function() {
    var base = '/deface/themes/' + Deface.theme_id + '/view_overrides';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  },

  validate: function(attrs) {
    var errors = new Object;
    var has_errors = false;

    if(attrs.name==""){
      errors['name'] = "Name cannot be blank";
      has_errors = true;
    }

    if(attrs.virtual_path==""){
      errors['virtual_path'] = "Virutal Path cannot be blank";
      has_errors = true;
    }

    if(attrs.target==""){
      errors['target'] = "Action cannot be blank";
      has_errors = true;
    }

    if(attrs.selector==""){
      errors['selector'] = "Selector cannot be blank";
      has_errors = true;
    }

    if(has_errors){
      return errors;
    }
  }

});
