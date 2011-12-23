Spraycan.Views.Files.Edit = Backbone.View.extend({
  events: {
    "click button#save": "save"
  },

  initialize: function(opts) {
    Spraycan.view = this;
    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/files/tweaker_edit"];

    $(this.el).html(compiled());
    $('#colors-container').html('');
    $('#design-container').html('');
    $('#fonts-container').html('');
    $('#images-container').html(this.el);

    _.each(['logo_file_name', 'background_file_name'], function(pref){

      var uploader = new qq.FileUploader({
        element: document.getElementById(pref + '_uploader'),
        action: '/spraycan/themes/' + Spraycan.theme_id + '/files.json',
        template: '<div class="qq-uploader">' +
                '<div class="qq-upload-drop-area"><span>Drop image here to upload.</span></div>' +
                '<a href="#" class="qq-upload-button">Upload Image</a>' +
                '<ul class="qq-upload-list"></ul>' +
            '</div>',
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
        params: {
          preference: pref,
        },
        onComplete: function(id, fileName, responseJSON){
          Spraycan.reload_frame();
          Spraycan.preferences[pref] = responseJSON.filename;
          Spraycan.view.render()
        },
        onSubmit: function(count, file){
          if(count>0){
            return false;
          }
        }
      });

    });

  },

  save: function(event){
    event.preventDefault();
    // Spraycan.clear_errors();

    attrs = $('form#images_form').serializeObject();


   }

});

