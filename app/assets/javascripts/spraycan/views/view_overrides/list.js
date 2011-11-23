Spraycan.Views.ViewOverrides.List = Backbone.View.extend({
  el: 'div#main',

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/view_overrides/index'];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));

    $('iframe').height($(window).height() - 50);
  }

});
