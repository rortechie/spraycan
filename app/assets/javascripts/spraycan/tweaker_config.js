var Spraycan = {
  Views: {Layouts: {} },
  Routers: {},
  Collections: {},

  current: 'html',

  view: null,

  editor: {minimised: false, maximised: false, visible: false },

  loaded: {},

  busy: { ajax: false, iframe: true },

  //holds the last x models opened for each class
  current_collections: {},

  //holds unsaved models when main collection is being fetched
  new_collections: {},

  init: function() {
    new Spraycan.Routers.Tweaker();

    Spraycan.Themes = new Spraycan.Collections.Theme();


    Spraycan.reset_collections(); //initializes collection routers aswell

    Backbone.history.start();

    $('#tweaker').draggable({handle: '.drag_bar'});

    Spraycan.ensure_fetched('themes');

    var compiled = JST["spraycan/templates/navigation/design"];
    $('#design-container').html(compiled());
  },

  reset_collections: function(){
    Spraycan.loaded = { themes: false };

    Spraycan.current_collections = { themes: []};

    Spraycan.new_collections = { themes: [] };

    //recreates collections
    // new Spraycan.Routers.Files();
  },

  set_current: function(group, action, model){
  },

  reload_frame: function(){
    window.frames[0].location.reload();
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
