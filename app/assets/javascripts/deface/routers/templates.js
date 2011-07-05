Deface.Routers.Templates = Backbone.Router.extend({
  routes: {
    "templates/:controller/:action": "load",
  },

  load: function(controller, action) {
    Deface.templates = new Deface.Collections.Templates();
    Deface.templates.url += "?deface_controller=" + controller + "&deface_action=" + action;

    Deface.increment_activity();
    Deface.templates.fetch({
      success: function() {
        Deface.decrement_activity();
      }
    });
  }

});
