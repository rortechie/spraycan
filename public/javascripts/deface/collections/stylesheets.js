Deface.Collections.Stylesheets = Backbone.Collection.extend({
  model: Stylesheet,
  url: function(){
    return '/deface/themes/' + Deface.theme_id + '/stylesheets';
  }
});
