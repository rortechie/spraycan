Spraycan.Routers.Inspector = Backbone.Router.extend({
  routes: {
    "inspect": "show",
    "inspect/:hook": "show"
  },

  show: function(hook){
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    //set_current when inspector is on
    if(hook==undefined){
      Spraycan.set_current('view_overrides', 'inspect');
    }

    if(Spraycan.current=='view_overrides' && Spraycan.current_action=='inspect'){
      new Spraycan.Views.Inspector.Show({ hook: hook });
    }
  }

});
