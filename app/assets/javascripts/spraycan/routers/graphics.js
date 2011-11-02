Spraycan.Routers.Graphics = Backbone.Router.extend({
  routes: {
    "files": "load_all",
    "delete_graphic/:id": "delete_graphic"
  },

  load_all: function(name) {
    if(Spraycan.set_current('files')){
      //already loaded
    }else{
      if(Spraycan.graphics==undefined){
        Spraycan.graphics = new Spraycan.Collections.Graphics();

        Spraycan.graphics.bind("reset", this.update_graphics);
        Spraycan.graphics.bind("add", this.update_graphics);
        Spraycan.graphics.bind("remove", this.update_graphics);

        Spraycan.increment_activity("Loading files");
        Spraycan.graphics.fetch({
          success: function(){
            Spraycan.decrement_activity();
          },
          error: function() {
            new Error({ message: "Error loading files." });
          }
        });
      }
    }

    this.update_graphics();
  },

  update_graphics: function() {
    $("#loadables").css("visibility", "hidden");
    window.location.href ="#";

    if(Spraycan.current == 'files'){
      new Spraycan.Views.Graphics.List();
    }
  },

  delete_graphic: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var graphic = _.detect(Spraycan.graphics.models, function(t) { return t.id == id });
    Spraycan.increment_activity("Deleting file");
    graphic.destroy({success: function(model, resp){ Spraycan.decrement_activity(); }});
    Spraycan.graphics.remove(graphic);
  }

});
