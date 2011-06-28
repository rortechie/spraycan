Deface.Collections.ViewOverrides = Backbone.Collection.extend({
  model: ViewOverride,
  url: function(){
    return '/deface/themes/' + Deface.theme_id + '/view_overrides';
  }
});
