Deface.Collections.Themes = Backbone.Collection.extend({
  model: Theme,
  url: '/deface/themes',
  comparator: function(theme){
    return theme.get('position');
  }
});
