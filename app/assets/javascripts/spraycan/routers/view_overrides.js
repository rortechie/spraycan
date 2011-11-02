Spraycan.Routers.ViewOverrides = Backbone.Router.extend({
  routes: {
    "html": "load",
    "view_overrides/new/:hook": "new",
    "view_overrides/edit/:hook": "edit",
    "delete_view_override/:id": "delete_view_override"
  },

  load: function() {
    if(Spraycan.set_current('html')){
      //already loaded
    }else{

      if(Spraycan.view_overrides==undefined){
        Spraycan.view_overrides = new Spraycan.Collections.ViewOverrides();

        Spraycan.view_overrides.bind("reset", this.update_overrides);
        Spraycan.view_overrides.bind("add", this.update_overrides);
        Spraycan.view_overrides.bind("remove", this.update_overrides);

        Spraycan.increment_activity("Loading view overrides");
        Spraycan.view_overrides.fetch({
          success: function(){
            Spraycan.decrement_activity();
          },
          error: function() {
            new Error({ message: "Error loading overrides." });
          }
        });
      }
    }

    // $('li#load_loadable').removeClass('disabled');
    this.update_overrides();
  },

  new: function(hook) {
    var view_override = new top.ViewOverride({ hook: hook, selector: "[data-hook='" + hook + "'], #" + hook + "[data-hook]"})

    Spraycan.view = new top.Spraycan.Views.ViewOverrides.Edit({ model: view_override });
  },

  edit: function(hook) {
    var view_override = _.detect(Spraycan.view_overrides.models, function(vo){
      return vo.get('name')  == "replace_" + hook;
    });

    if(view_override==null){
      var view_override  = new ViewOverride({ hook: hook, name: "replace_" + hook, selector: "[data-hook='" + hook + "'], #" + hook + "[data-hook]"})
    }

    Spraycan.view = new Spraycan.Views.ViewOverrides.Edit({ model: view_override });

  },

  update_overrides: function() {
    new Spraycan.Views.ViewOverrides.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  },

  delete_view_override: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var view_override = _.detect(Spraycan.view_overrides.models, function(t) { return t.id == id });
    Spraycan.increment_activity("Deleting view override");
    view_override.destroy({success: function(model, resp){ Spraycan.decrement_activity(); }});
    Spraycan.view_overrides.remove(view_override);
    Spraycan.reset_editor();
    Spraycan.reload_frame();
  }

});
