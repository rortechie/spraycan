Spraycan.Routers.Layouts = Backbone.Router.extend({
  routes: {
    "tab-layouts": "index",
  },

  index: function(){
    new Spraycan.Views.Layouts.Index();
  }
});
