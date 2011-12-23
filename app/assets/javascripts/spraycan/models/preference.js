var Preference = Backbone.Model.extend({
  toJSON: function() {
    var object = new Object;
    object['preference'] = _.clone(this.attributes);
    object['cid'] = this.cid;
    return object;
  },

  klass: function(){
    return 'preference'
  },

  url: function() {
    var base = '/spraycan/preferences';
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

    if(has_errors){
      return errors;
    }
  }
});
