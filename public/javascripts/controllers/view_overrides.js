App.Controllers.ViewOverrides = Backbone.Controller.extend({
  routes: {
    "": "index",
    "view_overrides/new/:hook": "new",
    "view_overrides/edit/:hook": "edit"
  },

  index: function() {
    App.view_overrides = new App.Collections.ViewOverrides();
    App.view_overrides.fetch({
      success: function() {
        App.view = new App.Views.ViewOverrides.Index({ view_overrides: App.view_overrides });
      },
      error: function() {
        new Error({ message: "Error loading documents." });
      }
    });
  },

  new: function(hook) {
    var view_override  = new top.ViewOverride({ hook: hook,
                                                target: 'replace',
                                                disabled: false,
                                                replace_with: 'text',
                                                selector: "[data-hook='" + hook + "']" })

    new top.App.Views.ViewOverrides.Edit({ model: view_override });

  },

  edit: function(hook) {
    var view_override = _.detect(App.view_overrides.models, function(vo){
      return vo.get('name')  == "replace_" + hook;
    });

    if(view_override==null){
      var view_override  = new top.ViewOverride({ hook: hook,
                                                target: 'replace',
                                                disabled: false,
                                                name: "replace_" + hook,
                                                replace_with: 'text',
                                                selector: "[data-hook='" + hook + "']" })
    }

    new top.App.Views.ViewOverrides.Edit({ model: view_override });

  }

});

