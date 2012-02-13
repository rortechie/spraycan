Spraycan.Routers.Themes = Spraycan.Routers.Base.extend({
  klass: 'themes',

  routes: {
    "theme?all": "all",
    "theme/:cid": "edit",
    "theme?new": "new_record",
    "theme?delete=:cid&confirm=:confirm": "delete_record",
    "theme?switch=:cid": "switch_theme"
  },

  initialize: function(){
    Spraycan[this.klass] =  eval("new Spraycan.Collections." + this.klass.camelize() + "()");
    Spraycan[this.klass].bind("reset", this.collection_fetched, this);
    Spraycan[this.klass].bind("reset", this.collection_changed, this);
    Spraycan[this.klass].bind("add", this.collection_changed, this);
    Spraycan[this.klass].bind("remove", this.collection_changed, this);
  },

  all: function(name) {
    Spraycan.set_current(this.klass, 'index');
    Spraycan.ensure_fetched(this.klass);

    eval("new Spraycan.Views." + this.klass.camelize() + ".Index()");
  },

  switch_theme: function(cid) {
    var theme = Spraycan[this.klass].getByCid(cid);

    Spraycan.theme_id = theme.id;
    Spraycan.theme_name = theme.attributes.name;

    Spraycan.reset_collections();
    Spraycan.refresh_toolbar();

    // frames[0].location.href = frames[0].location.href;

    window.location.href ="#";
    new Spraycan.Views.Themes.Index();
  }

  // delete_theme: function(id) {
  //   $('.qtip.ui-tooltip').qtip('hide');

  //   if(Spraycan.themes.length==1){
  //     $('img#busy').show_message("Whoops!", "Sorry you cannot delete the last theme, please add a new theme before deleting this one.");
  //   }else{
  //     var theme = _.detect(Spraycan.themes.models, function(t) { return t.id == id });
  //     theme.destroy();
  //     Spraycan.themes.remove(theme);

  //     if(Spraycan.theme_id==id){
  //       window.location.href ="spraycan#switch_theme/" + Spraycan.themes.models[0].get('id');
  //     }
  //   }
  // }

});

