Deface.Collections.Stylesheets = Backbone.Collection.extend({
  model: Stylesheet,
  url: '/deface/themes/' + Deface.theme_id + '/stylesheets'
});
