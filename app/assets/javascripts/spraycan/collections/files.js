Spraycan.Collections.Files = Backbone.Collection.extend({
  model: File,
  url: function(){
    return '/spraycan/themes/' + Spraycan.theme_id + '/files';
  }
});
