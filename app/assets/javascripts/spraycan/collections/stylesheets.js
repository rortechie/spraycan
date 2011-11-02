Spraycan.Collections.Stylesheets = Backbone.Collection.extend({
  model: Stylesheet,
  url: function(){
    return '/spraycan/themes/' + Spraycan.theme_id + '/stylesheets';
  }
});
