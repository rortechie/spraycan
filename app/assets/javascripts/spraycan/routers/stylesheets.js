Spraycan.Routers.Stylesheets = Backbone.Router.extend({
  routes: {
    "stylesheet/:name": "load",
    "delete_stylesheet/:id": "delete_stylesheet"
  },

  load: function(name) {
    if(Spraycan.set_current('css')){
      //already loaded
       }else{
      if(Spraycan.stylesheets==undefined){
        Spraycan.stylesheets = new Spraycan.Collections.Stylesheets();

        Spraycan.stylesheets.bind("reset", this.update_stylesheets);
        Spraycan.stylesheets.bind("add", this.update_stylesheets);
        Spraycan.stylesheets.bind("remove", this.update_stylesheets);

        Spraycan.increment_activity("Loading stylesheets");
        Spraycan.stylesheets.fetch({
          success: function(){
            Spraycan.decrement_activity();
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
    new Spraycan.Views.Stylesheets.List();
    $("#loadables").css("visibility", "visible");
    window.location.href ="#";
  },

  delete_stylesheet: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var stylesheet = _.detect(Spraycan.stylesheets.models, function(t) { return t.id == id });

    if(frames[0].$jQ("style#" + stylesheet.get('name')).length==1){
      frames[0].$jQ("style#" + stylesheet.get('name')).remove();
    }
    Spraycan.increment_activity("Deleting stylesheet");
    stylesheet.destroy({success: function(model, resp){ Spraycan.decrement_activity(); }});
    Spraycan.stylesheets.remove(stylesheet);
    Spraycan.reset_editor();
  }

});
