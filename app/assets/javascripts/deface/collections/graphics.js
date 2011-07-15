Deface.Collections.Graphics = Backbone.Collection.extend({
  model: Graphic,
  url: function(){
    return '/deface_editor/themes/' + Deface.theme_id + '/graphics';
  }
});
