var Graphic = Backbone.Model.extend({
  toJSON: function() {
    var object = new Object;
    object['graphic'] = _.clone(this.attributes);
    return object;
  },

  klass: function(){
    return 'graphic'
  },

  url : function() {
    var base = '/deface_editor/themes/' + Deface.theme_id + '/graphics';
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
