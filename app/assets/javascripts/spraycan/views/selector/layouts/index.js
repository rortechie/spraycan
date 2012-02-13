Spraycan.Views.Layouts.Index = Backbone.View.extend({
  events: {
    "click .tabs-content li a": "show_selected"
  },

  initialize: function() {
    Spraycan.set_current('layouts', 'index');
    Spraycan.view = this;

    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/selector/layouts/index"];
    $(this.el).html(compiled());
    $('#main').html(this.el);

    $("#spreeworks-editor .tabs .active").removeClass('active');
    $("#spreeworks-editor .tabs .layouts").addClass('active');

    $("#tab-layouts").tabs();

    $("#spreeworks-editor .content")
        .removeClass('active-layouts active-colors active-fonts active-images')
        .addClass('active-layouts')
        .find(".tab.active")
        .hide()
        .removeClass('active');

    $("#spreeworks-editor .content")
      .show()
      .find(".tab#tab-layouts")
      .show()
      .addClass('active');

    return this;
  },

  show_selected: function(sel){
    $(sel.currentTarget).parents('ul').find('li').removeClass('active');
    $(sel.currentTarget).parents('li').addClass('active');
  }
});
