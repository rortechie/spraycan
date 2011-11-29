Spraycan.Views.Themes.Edit = Backbone.View.extend({
  show_form: false,

  events: {
    "change #file1" :"upload_file",
    "click button[rel='save']:not(.disabled)": "save",
  },

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
      height = ($(window).height() - 50);
      //leave it at defaul
    }else{

    }

    return height;
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/themes/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    Spraycan.animate_resize(this.calculate_size());

    return this;
  },

  save: function(e) {
    Spraycan.clear_errors();

    attrs = $('form#theme_form').serializeObject();
    if(attrs.active==undefined){
      attrs.active = false;
    }
    
    this.model.save(attrs, {
      success: function(model, resp) {

        $("a[rel='delete']").html('Delete');
      },
      error: Spraycan.handle_save_error
    });

    return false;
  },


  upload_file: function(){
    $(this).upload('/spraycan/themes/import.js', function(res) {
      frames[0].location.href = frames[0].location.href;
      Spraycan.themes.fetch();
    }, 'json');
  }
});

