Spraycan.Views.Shared.Toolbar = Backbone.View.extend({
  events: {
    "click a[rel='navigate']": "navigate",
    "click a[rel='min']": "minimise",
    "click a[rel='restore']": "restore",
    "click a[rel='max']": "maximise",
    "click a[rel='zoom-in']": "zoom_in",
    "click a[rel='zoom-out']": "zoom_out",
    "click a[rel='toggle']": "toggle",
    "click a[rel='refresh']": "refresh"
  },

  initialize: function() {
    this.render();
  },

  minimise: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = false;
      Spraycan.editor.minimised = true;
      Spraycan.animate_resize();
    }
    return false;
  },

  restore: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = false;
      Spraycan.editor.minimised = false;
      Spraycan.animate_resize();
    }

    return false;
  },

  maximise: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = true;
      Spraycan.editor.minimised = false;
      Spraycan.animate_resize();
    }

    return false;
  },

  render: function() {
    var compiled = JST["spraycan/templates/shared/toolbar"];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));
    $('#toolbar').html(this.el);

    $('iframe').height($(window).height() - 50);
  },

  zoom_in: function() {
    frames[0].hook_zoom('in');
    return false;
  },

  zoom_out: function() {
    frames[0].hook_zoom('out');
    return false;
  },

  toggle: function() {
    frames[0].show_frames = !frames[0].show_frames;
    frames[0].show_hook_frames();
    return false;
  },

  refresh: function() {
    frames[0].location.href = frames[0].location.href;
    return false;
  },

  navigate: function() {
    new Spraycan.Views.Shared.navigate();
    return false;
  }

});
