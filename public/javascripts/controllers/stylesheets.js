App.Controllers.Stylesheets = Backbone.Controller.extend({
  routes: {
    "stylesheets/:name": "load",
  },

  load: function(name) {
    console.log("NEED TO LOAD SINGLE STYLESHEET", name);
  }

});
