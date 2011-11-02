Spraycan.Routers.Templates = Backbone.Router.extend({
  routes: {
    "templates/:controller/:action": "load",
  },

  load: function(controller, action) {
    Spraycan.templates = new Spraycan.Collections.Templates();
    Spraycan.templates.url += "?spraycan_controller=" + controller + "&spraycan_action=" + action;

    Spraycan.increment_activity("Loading templates");
    Spraycan.templates.fetch({
      success: function() {
        Spraycan.decrement_activity();
      }
    });
  }

});
