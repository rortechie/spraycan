var Spraycan = {
  Views: {Shared: {}, Palettes: {}, Fonts: {}, Files: {} },
  Routers: {},
  Collections: {},

  current: 'html',

  current_action: null,

  view: null,

  editor: {minimised: false, maximised: false, visible: false },

  loaded: {},

  busy: { ajax: false, iframe: true },

  //holds the last x models opened for each class
  current_collections: {},

  //holds unsaved models when main collection is being fetched
  new_collections: {themes: []},

  theme_id: null,

  preload: { themes: null },

  preferences: { logo_file_name: null, background_file_name: null, title_font: null, title_font_size: null, body_font: null, body_font_size: null },

  rollback: { preferences: {} },

  init: function() {
    Spraycan.themes = new Spraycan.Collections.Themes();
    Spraycan.palettes = new Spraycan.Collections.Palettes();
    Spraycan.files = new Spraycan.Collections.Palettes();

    new Spraycan.Routers.Tweaker();
    new Spraycan.Routers.Files();
    new Spraycan.Routers.Palettes();

    Spraycan.reset_collections(); //initializes collection routers aswell

    Backbone.history.start();

    $('#tweaker').draggable({handle: '.drag_bar'});

    Spraycan.themes.reset(Spraycan.preload.themes);
    Spraycan.loaded.themes = true;

    Spraycan.palettes.reset(Spraycan.preload.palettes);
    Spraycan.loaded.palettes = true;


    if(Spraycan.current=='design' && Spraycan.current_action=='index'){
      var compiled = JST["spraycan/templates/navigation/design"];
      $('#design-container').html(compiled());
    }
  },

  reset_collections: function(){
    Spraycan.loaded = { themes: false, palettes: false };

    Spraycan.current_collections = { themes: []};

    Spraycan.new_collections = { themes: [] };

    //recreates collections
    // new Spraycan.Routers.Files();
  },

  set_current: function(group, action, model){
    Spraycan.current = group;
    Spraycan.current_action = action;
  },

  refresh_toolbar: function(){
    // not used
  },

  reload_frame: function(){
    window.frames[0].location.reload();
  },

  reset_url: function(){
    window.location.href = "#";
  },

  ensure_fetched: function(collection){
    if(!Spraycan.loaded[collection]){
      Spraycan.new_collections[collection] = _.select(Spraycan[collection].models, function(model){
        return model.get('id') == undefined;
      });

      Spraycan[collection].fetch({
        error: function() {
          Spraycan.loaded[collection] = false;
          new Error({ message: "Error loading collection." });
        }
      });
    }
  },

  iframe_busy: function(state){
    Spraycan.busy.iframe = state;
    Spraycan.busy_indicator();
  },

  busy_indicator: function(){
    if(Spraycan.busy.iframe || Spraycan.busy.ajax){
      $('#busy').show();
    }else{
      $('#busy').hide();
    }
  }
};
