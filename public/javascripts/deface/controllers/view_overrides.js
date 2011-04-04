Deface.Controllers.ViewOverrides = Backbone.Controller.extend({
  routes: {
    "html": "load",
    "view_overrides/new/:hook": "new",
    "view_overrides/edit/:hook": "edit"
  },

  load: function() {
    if(Deface.set_current('html')){
      //already loaded
      this.update_overrides();
    }else{

      if(Deface.view_overrides==undefined){
        Deface.view_overrides = new Deface.Collections.ViewOverrides();

        Deface.view_overrides.bind("refresh", this.update_overrides);
        Deface.view_overrides.bind("add", this.update_overrides);
        Deface.view_overrides.bind("remove", this.update_overrides);

        Deface.increment_activity();
        Deface.view_overrides.fetch({
          error: function() {
            new Error({ message: "Error loading overrides." });
          }
        });
      }
    }

    window.location.href ="#";
  },

  new: function(hook) {
    var view_override  = new top.ViewOverride({ hook: hook,
                                                target: 'replace',
                                                disabled: false,
                                                replace_with: 'text',
                                                selector: "[data-hook='" + hook + "']" })

    Deface.view = new top.Deface.Views.ViewOverrides.Edit({ model: view_override });
  },

  edit: function(hook) {
    var view_override = _.detect(Deface.view_overrides.models, function(vo){
      return vo.get('name')  == "replace_" + hook;
    });

    if(view_override==null){
      var view_override  = new ViewOverride({ hook: hook,
                                                target: 'replace',
                                                disabled: false,
                                                name: "replace_" + hook,
                                                replace_with: 'text',
                                                selector: "[data-hook='" + hook + "']" })
    }

    Deface.view = new Deface.Views.ViewOverrides.Edit({ model: view_override });

  },

  update_overrides: function() {
    $("#loadables").show();
    Deface.decrement_activity();

    if(Deface.current == 'html'){
      $('li#load_loadable').removeClass('disabled');
      new Deface.Views.ViewOverrides.List();
    }
  }

});
