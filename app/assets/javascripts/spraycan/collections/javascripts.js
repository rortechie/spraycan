Spraycan.Collections.Javascripts = Backbone.Collection.extend({
  model: Javascript,
  url: function(){
    return '/spraycan/themes/' + Spraycan.theme_id + '/javascripts';
  }
});
