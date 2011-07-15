Deface.Routers.ViewOverrides = Backbone.Router.extend({
  routes: {
    "html": "load",
    "view_overrides/new/:hook": "new",
    "view_overrides/edit/:hook": "edit",
    "delete_view_override/:id": "delete_view_override"
  },

  load: function() {
    if(Deface.set_current('html')){
      //already loaded
    }else{

      if(Deface.view_overrides==undefined){
        Deface.view_overrides = new Deface.Collections.ViewOverrides();

        Deface.view_overrides.bind("reset", this.update_overrides);
        Deface.view_overrides.bind("add", this.update_overrides);
        Deface.view_overrides.bind("remove", this.update_overrides);

        Deface.increment_activity("Loading view overrides");
        Deface.view_overrides.fetch({
          success: function(){
            Deface.decrement_activity();
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

    Deface.view = new top.Deface.Views.ViewOverrides.Edit({ model: view_override });
  },

  edit: function(hook) {
    var view_override = _.detect(Deface.view_overrides.models, function(vo){
      return vo.get('name')  == "replace_" + hook;
    });

    if(view_override==null){
      var view_override  = new ViewOverride({ hook: hook, name: "replace_" + hook, selector: "[data-hook='" + hook + "'], #" + hook + "[data-hook]"})
    }

    Deface.view = new Deface.Views.ViewOverrides.Edit({ model: view_override });

  },

  update_overrides: function() {
    new Deface.Views.ViewOverrides.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  },

  delete_view_override: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var view_override = _.detect(Deface.view_overrides.models, function(t) { return t.id == id });
    Deface.increment_activity("Deleting view override");
    view_override.destroy({success: function(model, resp){ Deface.decrement_activity(); }});
    Deface.view_overrides.remove(view_override);
    Deface.reset_editor();
    Deface.reload_frame();
  }

});
