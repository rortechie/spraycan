Spraycan.Views.Palettes.Edit = Backbone.View.extend({
  current_color_picker: null,

  events: {
    "click button#save": "save"
  },

  initialize: function() {
    Spraycan.view = this;

    $(this.el).data('view', this);
    this.model = this.options.model;

    this.render();
  },

  save: function(event) {
    event.preventDefault();
    // Spraycan.clear_errors();

    attrs = $('form#palette_form').serializeObject();

    this.model.save(attrs, {
      success: function(model, resp) {
        Spraycan.reload_frame();
      },
      error: Spraycan.handle_save_error
    });

    return false;
  },

  render: function() {
    var compiled = JST["spraycan/templates/palettes/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#design-container').html('');
    $('#colors-container').html(this.el);
    $('#fonts-container').html('');
    $('#images-container').html('');

    $('#colors-container .picker').ColorPicker({
      onBeforeShow: function (x,y,z,f) {
        Spraycan.view.current_color_picker = $(this)
        $(this).ColorPickerSetColor($(this).find('input').val());
      },
	    onSubmit: function(hsb, hex, rgb, el) {
		    Spraycan.view.current_color_picker.find('input').val('#' + hex);
		    $(el).ColorPickerHide();
	    },
      onChange: function (hsb, hex, rgb) {
        Spraycan.view.current_color_picker.find('.sample').css('backgroundColor', '#' + hex);
        Spraycan.view.current_color_picker.find('input').val('#' + hex);
    	} });

    return this;
  }
});

