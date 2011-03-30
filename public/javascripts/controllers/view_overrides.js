App.Controllers.ViewOverrides = Backbone.Controller.extend({
  routes: {
    "html": "load",
    "view_overrides/new/:hook": "new",
    "view_overrides/edit/:hook": "edit"
  },

  load: function() {
    App.set_current('html');

    if(App.view_overrides==undefined){
      App.view_overrides = new App.Collections.ViewOverrides();

      App.view_overrides.bind("refresh", this.update_overrides);
      App.view_overrides.bind("add", this.update_overrides);
      App.view_overrides.bind("remove", this.update_overrides);
    }else{
      //already have overrides loaded so can show drop down
      $("#loadables").show();
    }

    App.increment_activity();
    App.view_overrides.fetch({
      error: function() {
        new Error({ message: "Error loading overrides." });
      }
    });
  },

  new: function(hook) {
    var view_override  = new top.ViewOverride({ hook: hook,
                                                target: 'replace',
                                                disabled: false,
                                                replace_with: 'text',
                                                selector: "[data-hook='" + hook + "']" })

    App.view = new top.App.Views.ViewOverrides.Edit({ model: view_override });
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

    App.view = new top.App.Views.ViewOverrides.Edit({ model: view_override });

  },

  update_overrides: function() {
    $("#loadables").show();
    App.decrement_activity();

    if(App.current == 'html'){
      $('li#load_loadable').removeClass('disabled');
      new App.Views.ViewOverrides.List();
    }
  }

});
