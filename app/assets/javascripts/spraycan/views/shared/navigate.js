Spraycan.Views.Shared.navigate = Backbone.View.extend({
  show_form: true,

  events: {
    "click button": "navigate"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.maximised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/shared/navigate"];
    $(this.el).html(compiled({ url : frames[0].location.href }));
    $('#main').html(this.el);

    Spraycan.view = this;
    Spraycan.animate_resize();
  },

  calculate_size: function() {
    var height = 0;
    if(this.show_form){
      height += 40;
    }

    return height;
  },

  navigate: function() {
    frames[0].location.href = $("input#url").val();

    Spraycan.editor.visible = false;
    this.show_form = false;
    Spraycan.animate_resize();
  }
});
