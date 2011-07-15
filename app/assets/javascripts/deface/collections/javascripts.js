Deface.Collections.Javascripts = Backbone.Collection.extend({
  model: Javascript,
  url: function(){
    return '/deface_editor/themes/' + Deface.theme_id + '/javascripts';
  }
});
