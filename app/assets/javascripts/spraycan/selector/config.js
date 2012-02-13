var Spraycan = {
  Views: {Shared: {}, Layouts: {}, Palettes: {}, Fonts: {} },
  Routers: {},
  Collections: {},

  current: null,

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

    new Spraycan.Routers.Selector();
    new Spraycan.Routers.Layouts();
    new Spraycan.Routers.Palettes();
    new Spraycan.Routers.Fonts();

    Spraycan.reset_collections(); //initializes collection routers aswell

    Spraycan.themes.reset(Spraycan.preload.themes);
    Spraycan.loaded.themes = true;

    Spraycan.palettes.reset(Spraycan.preload.palettes);
    Spraycan.loaded.palettes = true;


    Backbone.history.start();

    var editor = $("#spreeworks-editor");

    editor.find('.toolbar').width(
      editor.find('.toolbar').width()
    );

    editor.draggable({
      handle: 'nav.actions li.drag span.icon',
      containment: 'window'

    });

    Spraycan.preload_fonts();

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
  },

  preload_fonts: function(){
    // load google fonts
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  }
};
