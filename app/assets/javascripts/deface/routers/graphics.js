Deface.Routers.Graphics = Backbone.Router.extend({
  routes: {
    "files": "load_all",
    "delete_graphic/:id": "delete_graphic"
  },

  load_all: function(name) {
    if(Deface.set_current('files')){
      //already loaded
    }else{
      if(Deface.graphics==undefined){
        Deface.graphics = new Deface.Collections.Graphics();

        Deface.graphics.bind("reset", this.update_graphics);
        Deface.graphics.bind("add", this.update_graphics);
        Deface.graphics.bind("remove", this.update_graphics);

        Deface.increment_activity("Loading files");
        Deface.graphics.fetch({
          success: function(){
            Deface.decrement_activity();
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

    if(Deface.current == 'files'){
      new Deface.Views.Graphics.List();
    }
  },

  delete_graphic: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var graphic = _.detect(Deface.graphics.models, function(t) { return t.id == id });
    Deface.increment_activity("Deleting file");
    graphic.destroy({success: function(model, resp){ Deface.decrement_activity(); }});
    Deface.graphics.remove(graphic);
  }

});
