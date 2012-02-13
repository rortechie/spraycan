Spraycan.Views.Javascripts.Index = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/editor/javascripts/index'];

    $(this.el).html(compiled({ collection : Spraycan.javascripts }));
    $('#main').html(this.el);

    $('iframe').height($(window).height() - 40);
  }

});

