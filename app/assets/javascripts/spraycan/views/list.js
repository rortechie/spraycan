Spraycan.Views.Themes.List = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/palettes/index'];

    $(this.el).html(compiled({ collection : Spraycan.palettes }));
    $('#main').html(this.el);

    return this;
  },

});
