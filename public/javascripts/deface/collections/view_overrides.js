Deface.Collections.ViewOverrides = Backbone.Collection.extend({
  model: ViewOverride,
  url: '/deface/themes/' + Deface.theme_id + '/view_overrides'
});
