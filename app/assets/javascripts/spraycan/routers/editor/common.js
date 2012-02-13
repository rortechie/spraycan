Spraycan.Routers.Common = Backbone.Router.extend({
  routes: {
    "cancel_dialog": "cancel_dialog",
    "maximize": "maximize",
    "minimize": "minimize",
    "restore": "restore"
  },

  cancel_dialog: function() {
    window.location.href ="#";
    $('.modal.in').modal('hide');
  },

  maximize: function(){
    window.location.href ="#";
    Spraycan.editor.maximised = true;
    Spraycan.editor.minimised = false;
    Spraycan.view.trigger('editor:resize');

    $('#resize_restore').css({display:'block'});

    Spraycan.animate_resize();
  },

  minimize: function(){
    window.location.href ="#";
    Spraycan.editor.maximised = false;
    Spraycan.editor.minimised = true;
    Spraycan.view.trigger('editor:resize');

    $('#restore').css({display:'block'});
    $('#resize_restore').css({display:'none'});
    $('#resize').hide();

    Spraycan.animate_resize();
  },

  restore: function() {
    window.location.href ="#";
    Spraycan.editor.maximised = false;
    Spraycan.editor.minimised = false;
    Spraycan.view.trigger('editor:resize');

    $('#restore').css({display:'none'});
    $('#resize_restore').css({display:'none'});
    $('#resize').show();

    Spraycan.animate_resize(Spraycan.view.calculate_size());
  }
});
