Deface.Collections.Javascripts = Backbone.Collection.extend({
  model: Javascript,
  url: function(){
    return '/deface/themes/' + Deface.theme_id + '/javascripts';
  }
});
