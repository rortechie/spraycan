App.Controllers.Stylesheets = Backbone.Controller.extend({
  routes: {
    "stylesheet/:name": "load",
  },

  load: function(name) {
    App.set_current('css');

    if(App.stylesheets==undefined){
      App.stylesheets = new App.Collections.Stylesheets();

      App.stylesheets.bind("refresh", this.update_stylesheets);
      App.stylesheets.bind("add", this.update_stylesheets);
      App.stylesheets.bind("remove", this.update_stylesheets);
    }else{
      //already have stylesheets loaded so can show drop down
      $("#loadables").show();
    }

    App.increment_activity();
    App.stylesheets.fetch({
      error: function() {
        new Error({ message: "Error loading overrides." });
      }
    });

    window.location.href ="#";
  },

  update_stylesheets: function() {
    $("#loadables").show();
    App.decrement_activity();

    if(App.current == 'css'){
      new App.Views.Stylesheets.List();
      $('li#load_loadable').removeClass('disabled');
    }
  }

});
