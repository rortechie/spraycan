Deface.Routers.Javascripts = Backbone.Router.extend({
  routes: {
    "javascript/:name": "load",
  },

  load: function(name) {
    if(Deface.set_current('js')){
      //already loaded
       }else{
      if(Deface.javascripts==undefined){
        Deface.javascripts = new Deface.Collections.Javascripts();

        Deface.javascripts.bind("reset", this.update_javascripts);
        Deface.javascripts.bind("add", this.update_javascripts);
        Deface.javascripts.bind("remove", this.update_javascripts);

        Deface.increment_activity();
        Deface.javascripts.fetch({
          success: function(){
            Deface.decrement_activity();
          },
          error: function() {
            new Error({ message: "Error loading javascripts." });
          }
        });
      }
    }

    this.update_javascripts();
  },

  update_javascripts: function() {
    new Deface.Views.Javascripts.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  }

});

