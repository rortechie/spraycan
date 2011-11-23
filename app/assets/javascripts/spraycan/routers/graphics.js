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

        Spraycan.graphics.fetch({
          error: function() {
            new Error({ message: "Error loading files." });
          }
        });
      }
    }

    this.update_graphics();
  },

  update_graphics: function() {
    window.location.href ="#";

    if(Spraycan.current == 'files'){
      new Spraycan.Views.Graphics.List();
    }
  },

  delete_graphic: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var graphic = _.detect(Spraycan.graphics.models, function(t) { return t.id == id });
    graphic.destroy();
    Spraycan.graphics.remove(graphic);
  }

});
