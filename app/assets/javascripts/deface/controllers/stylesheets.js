Deface.Controllers.Stylesheets = Backbone.Controller.extend({
  routes: {
    "stylesheet/:name": "load",
  },

  load: function(name) {
    if(Deface.set_current('css')){
      //already loaded
       }else{
      if(Deface.stylesheets==undefined){
        Deface.stylesheets = new Deface.Collections.Stylesheets();

        Deface.stylesheets.bind("refresh", this.update_stylesheets);
        Deface.stylesheets.bind("add", this.update_stylesheets);
        Deface.stylesheets.bind("remove", this.update_stylesheets);

        Deface.increment_activity();
        Deface.stylesheets.fetch({
          success: function(){
            Deface.decrement_activity();
          },
          error: function() {
            new Error({ message: "Error loading overrides." });
          }
        });
      }
    }

    this.update_stylesheets();

    // $('li#load_loadable').removeClass('disabled');
  },

  update_stylesheets: function() {
    new Deface.Views.Stylesheets.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  }

});
