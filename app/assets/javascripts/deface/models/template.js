var Template = Backbone.Model.extend({
  url : function() {
    var base = '/deface/templates';
    if (this.isNew()) return base;
    return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
  },
  
  klass: function(){
    return 'template'
  }

});

