Deface.Controllers.Stylesheets = Backbone.Controller.extend({
  routes: {
    "stylesheet/:name": "load",
  },

  load: function(name) {
    Deface.set_current('css');

    if(Deface.stylesheets==undefined){
      Deface.stylesheets = new Deface.Collections.Stylesheets();

      Deface.stylesheets.bind("refresh", this.update_stylesheets);
      Deface.stylesheets.bind("add", this.update_stylesheets);
      Deface.stylesheets.bind("remove", this.update_stylesheets);
    }else{
      //already have stylesheets loaded so can show drop down
      $("#loadables").show();
    }

    Deface.increment_activity();
    Deface.stylesheets.fetch({
      error: function() {
        new Error({ message: "Error loading overrides." });
      }
    });

    window.location.href ="#";
  },

  update_stylesheets: function() {
    $("#loadables").show();
    Deface.decrement_activity();

    if(Deface.current == 'css'){
      new Deface.Views.Stylesheets.List();
      $('li#load_loadable').removeClass('disabled');
    }
  }

});
