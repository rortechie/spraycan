Deface.Collections.Graphics = Backbone.Collection.extend({
  model: Graphic,
  url: function(){
    return '/deface/themes/' + Deface.theme_id + '/graphics';
  }
});
