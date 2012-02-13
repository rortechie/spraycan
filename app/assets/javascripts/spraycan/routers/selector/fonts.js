Spraycan.Routers.Fonts = Backbone.Router.extend({
  routes: {
    "tab-fonts": "edit",
  },

  edit: function(){
    new Spraycan.Views.Fonts.Edit();
  }
});
