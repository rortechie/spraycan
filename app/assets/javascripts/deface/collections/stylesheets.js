Deface.Collections.Stylesheets = Backbone.Collection.extend({
  model: Stylesheet,
  url: function(){
    return '/deface_editor/themes/' + Deface.theme_id + '/stylesheets';
  }
});
