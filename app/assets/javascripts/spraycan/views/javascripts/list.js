Spraycan.Views.Javascripts.List = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/javascripts/index'];

    $(this.el).html(compiled({ collection : Spraycan.javascripts }));
    $('#main').html(this.el);

    $('iframe').height($(window).height() - 50);
  }

});

