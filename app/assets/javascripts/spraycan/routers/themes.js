Spraycan.Routers.Themes = Backbone.Router.extend({
  routes: {
    "themes": "load_all",
    "switch_theme/:id": "switch_theme",
    "delete_theme/:id": "delete_theme"
  },

  load_all: function(name) {
    Spraycan.set_current('themes')

    if(Spraycan.themes==undefined){
      Spraycan.themes = new Spraycan.Collections.Themes();

      Spraycan.themes.bind("reset", this.update_themes);
      Spraycan.themes.bind("add", this.update_themes);
      Spraycan.themes.bind("remove", this.update_themes);

      Spraycan.themes.fetch({
        error: function() {
          new Error({ message: "Error loading themes." });
        }
      });
    }

  },

  update_themes: function() {
    window.location.href ="#";
    new Spraycan.Views.Themes.List();
  },

  switch_theme: function(id) {
    var theme = _.detect(Spraycan.themes.models, function(t) { return t.id == id });

    Spraycan.theme_id = id;
    Spraycan.theme_name = theme.attributes.name;
    $('#theme_name').text(theme.attributes.name); 

    Spraycan.previous = { html: null, css: null, files: null };
    Spraycan.view_overrides = undefined;
    Spraycan.stylesheets = undefined;
    Spraycan.files = undefined;

    // frames[0].location.href = frames[0].location.href;

    window.location.href ="#";
    new Spraycan.Views.Themes.List();
  },

  delete_theme: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');

    if(Spraycan.themes.length==1){
      $('img#busy').show_message("Whoops!", "Sorry you cannot delete the last theme, please add a new theme before deleting this one.");
    }else{
      var theme = _.detect(Spraycan.themes.models, function(t) { return t.id == id });
      theme.destroy();
      Spraycan.themes.remove(theme);

      if(Spraycan.theme_id==id){
        window.location.href ="spraycan#switch_theme/" + Spraycan.themes.models[0].get('id');
      }
    }
  }

});

