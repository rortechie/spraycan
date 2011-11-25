Spraycan.Views.ViewOverrides.List = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/view_overrides/index'];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));
    $('#main').html(this.el);

    $('table#view_overrides').tableScroll({height:200});

    Spraycan.animate_resize(300);
  }

});
