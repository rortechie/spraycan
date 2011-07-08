Deface.Views.Shared.Toolbar = Backbone.View.extend({
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
    if(Deface.editor.visible){
      Deface.editor.maximised = false;
      Deface.editor.minimised = true;
      Deface.animate_resize();
    }
    return false;
  },

  restore: function() {
    if(Deface.editor.visible){
      Deface.editor.maximised = false;
      Deface.editor.minimised = false;
      Deface.animate_resize();
    }

    return false;
  },

  maximise: function() {
    if(Deface.editor.visible){
      Deface.editor.maximised = true;
      Deface.editor.minimised = false;
      Deface.animate_resize();
    }

    return false;
  },

  render: function() {
    var compiled = JST["deface/templates/shared/toolbar"];

    $(this.el).html(compiled({ collection : Deface.view_overrides }));
    $('#nav').html(this.el);

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
    new Deface.Views.Shared.navigate();
    return false;
  }

});
