Deface.Controllers.Stylesheets = Backbone.Controller.extend({
  routes: {
    "stylesheet/:name": "load",
  },

  load: function(name) {
    if(Deface.set_current('css')){
      //already loaded
      this.update_stylesheets();
    }else{
      if(Deface.stylesheets==undefined){
        Deface.stylesheets = new Deface.Collections.Stylesheets();

        Deface.stylesheets.bind("refresh", this.update_stylesheets);
        Deface.stylesheets.bind("add", this.update_stylesheets);
        Deface.stylesheets.bind("remove", this.update_stylesheets);

        Deface.increment_activity();
        Deface.stylesheets.fetch({
          error: function() {
            new Error({ message: "Error loading overrides." });
          }
        });
      }
    }

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
