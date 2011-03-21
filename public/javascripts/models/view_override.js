var ViewOverride = Backbone.Model.extend({
  url : function() {
    var base = 'view_overrides';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  },

  validate: function(attrs) {
    if(attrs.name==""){
      return "Name cannot be blank"
    }

    if(attrs.virtual_path==""){
      return "Virutal Path cannot be blank"
    }

    if(attrs.target==""){
      return "Action cannot be blank"
    }

    if(attrs.selector==""){
      return "Selector cannot be blank"
    }

  }

});
