Spraycan.Views.Javascripts.List = Backbone.View.extend({
  el: 'div#main',

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/javascripts/index'];

    $(this.el).html(compiled({ collection : Spraycan.javascripts }));

    $('iframe').height($(window).height() - 50);
  }

});

