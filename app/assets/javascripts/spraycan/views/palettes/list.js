Spraycan.Views.Palettes.List = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/palettes/index'];

    $(this.el).html(compiled({ palettes : Spraycan.palettes.models }));
    $('#design-container').html('');
    $('#colors-container').html(this.el);
    $('#fonts-container').html('');
    $('#images-container').html('');

    return this;
  },

});
