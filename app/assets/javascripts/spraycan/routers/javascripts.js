Spraycan.Routers.Javascripts = Backbone.Router.extend({
  routes: {
    "javascript/:name": "load",
    "delete_javascript/:id": "delete_javascript"
  },

  load: function(name) {
    if(Spraycan.set_current('js')){
      //already loaded
       }else{
      if(Spraycan.javascripts==undefined){
        Spraycan.javascripts = new Spraycan.Collections.Javascripts();

        Spraycan.javascripts.bind("reset", this.update_javascripts);
        Spraycan.javascripts.bind("add", this.update_javascripts);
        Spraycan.javascripts.bind("remove", this.update_javascripts);

        Spraycan.increment_activity("Loading javascripts");
        Spraycan.javascripts.fetch({
          success: function(){
            Spraycan.decrement_activity();
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
    new Spraycan.Views.Javascripts.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  },

  delete_javascript: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var javascript = _.detect(Spraycan.javascripts.models, function(t) { return t.id == id });
    Spraycan.increment_activity("Deleting javascript");
    javascript.destroy({success: function(model, resp){ Spraycan.decrement_activity(); }});
    Spraycan.javascripts.remove(javascript);
    Spraycan.reset_editor();
  }

});
