App.Controllers.Templates = Backbone.Controller.extend({
  routes: {
    "templates/:controller/:action": "load",
  },

  load: function(controller, action) {
    App.templates = new App.Collections.Templates();
    App.templates.url += "?deface_controller=" + controller + "&deface_action=" + action;
    App.templates.fetch();
  }

});


