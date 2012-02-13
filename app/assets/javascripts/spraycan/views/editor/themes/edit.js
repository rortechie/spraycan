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
    return 195;
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/editor/themes/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    if(this.model.id==undefined){
      var uploader = new qq.FileUploader({
        element: document.getElementById('file-uploader'),
        action: '/spraycan/themes/import.json',
        allowedExtensions: ['json'],
        template: '<div class="qq-uploader">' +
                '<div class="qq-upload-drop-area"><span>Drop theme file here to import</span></div>' +
                '<div class="qq-upload-button btn primary success pull-right">Import</div>' +
                '<ul class="qq-upload-list"></ul>' +
            '</div>',
        onComplete: function(id, fileName, responseJSON){
          // Spraycan.themes.fetch();
          // new Spraycan.Views.Themes.List();
          Spraycan.themes.remove(Spraycan.view.model);
        },
        onCancel: function(id, fileName){
          Spraycan.themes.fetch();
        }
      });
    }

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
        Spraycan.reload_frame();

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

