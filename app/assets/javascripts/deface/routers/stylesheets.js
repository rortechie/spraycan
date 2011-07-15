Deface.Routers.Stylesheets = Backbone.Router.extend({
  routes: {
    "stylesheet/:name": "load",
    "delete_stylesheet/:id": "delete_stylesheet"
  },

  load: function(name) {
    if(Deface.set_current('css')){
      //already loaded
       }else{
      if(Deface.stylesheets==undefined){
        Deface.stylesheets = new Deface.Collections.Stylesheets();

        Deface.stylesheets.bind("reset", this.update_stylesheets);
        Deface.stylesheets.bind("add", this.update_stylesheets);
        Deface.stylesheets.bind("remove", this.update_stylesheets);

        Deface.increment_activity("Loading stylesheets");
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
  },

  delete_stylesheet: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    var stylesheet = _.detect(Deface.stylesheets.models, function(t) { return t.id == id });

    if(frames[0].$jQ("style#" + stylesheet.get('name')).length==1){
      frames[0].$jQ("style#" + stylesheet.get('name')).remove();
    }
    Deface.increment_activity("Deleting stylesheet");
    stylesheet.destroy({success: function(model, resp){ Deface.decrement_activity(); }});
    Deface.stylesheets.remove(stylesheet);
    Deface.reset_editor();
  }

});
