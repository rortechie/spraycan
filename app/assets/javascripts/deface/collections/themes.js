Deface.Collections.Themes = Backbone.Collection.extend({
  model: Theme,
  url: '/deface_editor/themes',
  comparator: function(theme){
    return theme.get('position');
  }
});
