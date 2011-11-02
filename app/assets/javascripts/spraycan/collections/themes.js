Spraycan.Collections.Themes = Backbone.Collection.extend({
  model: Theme,
  url: '/spraycan/themes',
  comparator: function(theme){
    return theme.get('position');
  }
});
