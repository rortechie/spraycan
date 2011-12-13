Spraycan.Views.Layouts.Index = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    $(this.el).data('view', this);
    // this.hook = this.options.hook;

    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/layouts/index"];

    $(this.el).html(compiled());
    $('#design-container').html(this.el);
  }
});
