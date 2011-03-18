var ViewOverride = Backbone.Model.extend({
    url : function() {
      var base = 'view_overrides';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    }
});


