Spraycan.Views.Stylesheets.List = Backbone.View.extend({
  el: 'div#main',

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/stylesheets/index'];

    $(this.el).html(compiled({ collection : Spraycan.stylesheets }));

    $('iframe').height($(window).height() - 50);
  }

});
