Spraycan.Views.Files.Edit = Backbone.View.extend({
  show_form: false,

  initialize: function() {
    Spraycan.view = this;

    $(this.el).data('view', this);
    this.model = this.options.model;

    this.show_form = true;
    this.render();
  },

  calculate_size: function() {
    var height = 300;

    if(Spraycan.editor.maximised){
      height = ($(window).height() - 40);
      //leave it at defaul
    }else{

    }

    return height;
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/editor/files/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#edit_wrapper').html(this.el);

    Spraycan.animate_resize(this.calculate_size());

    return this;
  }
});
