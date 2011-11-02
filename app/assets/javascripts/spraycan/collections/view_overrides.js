Spraycan.Collections.ViewOverrides = Backbone.Collection.extend({
  model: ViewOverride,
  url: function(){
    return '/spraycan/themes/' + Spraycan.theme_id + '/view_overrides';
  }
});
