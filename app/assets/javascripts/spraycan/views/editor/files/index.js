Spraycan.Views.Files.Index = Backbone.View.extend({
  initialize: function() {
    this.render();
  },

  calculate_size: function() {
    var height = 0;

    if(Spraycan.editor.maximised){
      if(this.code_editor!=null){
        $(this.code_editor.container).height($(window).height() - 170);
        this.code_editor.resize();
      }

      height = ($(window).height() - 40);

    }else if(Spraycan.editor.minimised){
      //leave it at default 0
    }else{
      height += 300;
    }

    return height;
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/editor/files/index"];

    $(this.el).html(compiled({ collection : Spraycan.files }));
    $('#main').html(this.el);

    var uploader = new qq.FileUploader({
      element: document.getElementById('file-uploader'),
      action: '/spraycan/themes/' + Spraycan.theme_id + '/files.json',
      template: '<div class="qq-uploader">' +
              '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>' +
              '<div class="qq-upload-button btn primary success pull-right">New File</div>' +
              '<ul class="qq-upload-list"></ul>' +
          '</div>',
      onComplete: function(id, fileName, responseJSON){
        Spraycan.files.fetch();
      },
      onCancel: function(id, fileName){
        Spraycan.files.fetch();
      }
    });

    Spraycan.animate_resize(this.calculate_size());

    return this;
  },

  load_file: function(e) {
    var id = $(e.target).attr('data-file-id');
    var file = _.detect(Spraycan.files.models, function(g) { return g.id == id });

    this.model = file;

    var compiled = JST["spraycan/templates/files/show"];
    $('#file_details').html(compiled({ model : file }));

    $("a[rel='delete']").parent().removeClass('disabled');
  },

});
