Spraycan.Collections.Graphics = Backbone.Collection.extend({
  model: Graphic,
  url: function(){
    return '/spraycan/themes/' + Spraycan.theme_id + '/graphics';
  }
});
