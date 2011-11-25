Spraycan.Views.Stylesheets.List = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/stylesheets/index'];

    $(this.el).html(compiled({ collection : Spraycan.stylesheets }));
    $('#main').html(this.el);

    $('iframe').height($(window).height() - 50);
  }

});
