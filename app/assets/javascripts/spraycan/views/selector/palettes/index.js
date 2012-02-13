Spraycan.Views.Palettes.Index = Backbone.View.extend({
  events: {
    "click li#palette-spree a": "show_selected"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    var compiled = JST['spraycan/templates/selector/palettes/index'];

    $(this.el).html(compiled({ palettes : Spraycan.palettes.models }));

    $('#main').html(this.el);

    $("#tab-layouts").tabs();

    $("#spreeworks-editor .tabs .active").removeClass('active');
    $("#spreeworks-editor .tabs .colors").addClass('active');

    $("#spreeworks-editor .content")
        .removeClass('active-layouts active-colors active-fonts active-images')
        .addClass('active-colors')
        .find(".tab.active")
        .hide()
        .removeClass('active');

    $("#spreeworks-editor .content")
      .show()
      .find(".tab#tab-colors")
      .show()
      .addClass('active');

    return this;
  },

  show_selected: function(sel){
    $(sel.currentTarget).parents('ul').find('li').removeClass('active');
    $(sel.currentTarget).parents('li').addClass('active');
  }

});
