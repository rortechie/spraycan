Deface.Views.Shared.navigate = Backbone.View.extend({
  show_form: true,

  events: {
    "click button": "navigate"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    Deface.editor.minimised = false;
    Deface.editor.maximised = false;
    Deface.editor.visible = true;

    var compiled = JST["deface/templates/shared/navigate"];
    $(this.el).html(compiled({ url : frames[0].location.href }));
    $('#main').html(this.el);

    Deface.view = this;
    Deface.animate_resize();
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

    Deface.editor.visible = false;
    this.show_form = false;
    Deface.animate_resize();
  }
});
