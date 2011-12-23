Spraycan.Collections.Preferences = Backbone.Collection.extend({
  model: Preference,
  url: '/spraycan/preferences',
  toJSON: function() {
    return this.map(function(pref){ return  _.clone(pref.attributes); });
  }
});
