Deface.Routers.Javascripts = Backbone.Router.extend({
  routes: {
    "javascript/:name": "load",
    "delete_javascript/:id": "delete_javascript"
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
  },

  delete_javascript: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var javascript = _.detect(Deface.javascripts.models, function(t) { return t.id == id });
    javascript.destroy();
    Deface.javascripts.remove(javascript);
    Deface.reset_editor();
  }

});
