Deface.Controllers.Themes = Backbone.Controller.extend({
  routes: {
    "themes": "load_all",
    "switch_theme/:id": "switch_theme"
  },

  load_all: function(name) {
    Deface.set_current('themes')

    if(Deface.themes==undefined){
      Deface.themes = new Deface.Collections.Themes();

      Deface.themes.bind("refresh", this.update_themes);
      Deface.themes.bind("add", this.update_themes);
      Deface.themes.bind("remove", this.update_themes);

      Deface.increment_activity();
      Deface.themes.fetch({
        success: function(){
          Deface.decrement_activity();
        },
        error: function() {
          new Error({ message: "Error loading themes." });
        }
      });
    }

    this.update_themes();
  },

  update_themes: function() {
    Deface.decrement_activity();
    window.location.href ="#";
    new Deface.Views.Themes.List();
  },

  switch_theme: function(id) {
    var theme = _.detect(Deface.themes.models, function(t) { return t.id == id });

    console.log("switcih");
    Deface.theme_id = id;
    Deface.theme_name = theme.attributes.name;
    $('#theme_name').text(theme.attributes.name); 

    Deface.previous = { html: null, css: null, files: null };
    Deface.view_overrides = undefined;
    Deface.stylesheets = undefined;
    Deface.files = undefined;

    frames[0].location.href = frames[0].location.href;

    window.location.href ="#";
    new Deface.Views.Themes.List();
  }

});

