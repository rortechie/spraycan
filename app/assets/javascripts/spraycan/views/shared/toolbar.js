Spraycan.Views.Shared.Toolbar = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/shared/toolbar"];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));
    $('#toolbar').html(this.el);

    $('iframe').height($(window).height() - $('div#spraycan').height());
  }
});
