Spraycan.Views.Shared.Toolbar = Backbone.View.extend({
  events: {
    "click a[rel='navigate']": "navigate",
    "click a[rel='min']": "minimise",
    "click a[rel='restore']": "restore",
    "click a[rel='max']": "maximise",
    "click a[rel='refresh']": "refresh"
  },

  initialize: function() {
    this.render();
  },

  minimise: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = false;
      Spraycan.editor.minimised = true;
      Spraycan.animate_resize(this.calculate_size()); }
    return false;
  },

  restore: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = false;
      Spraycan.editor.minimised = false;
      Spraycan.animate_resize(this.calculate_size());
    }

    return false;
  },

  maximise: function() {
    if(Spraycan.editor.visible){
      Spraycan.editor.maximised = true;
      Spraycan.editor.minimised = false;
      Spraycan.animate_resize(this.calculate_size());
    }

    return false;
  },

  render: function() {
    var compiled = JST["spraycan/templates/shared/toolbar"];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));
    $('#toolbar').html(this.el);

    $('iframe').height($(window).height() - $('div#spraycan').height());
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
