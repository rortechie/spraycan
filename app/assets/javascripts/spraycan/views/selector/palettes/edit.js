Spraycan.Views.Palettes.Edit = Backbone.View.extend({
  current_color_picker: null,

  events: {
    "submit form": "save",
    "click input.back": "back"
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

    attrs = $('form#new-palette-form').serializeObject();

    this.model.save(attrs, {
      success: function(model, resp) {
        Spraycan.reload_frame();
      },
      error: Spraycan.handle_save_error
    });

    return false;
  },

  back: function(){
    window.location.href = "#tab-colors";
  },

  render: function() {
    var compiled = JST["spraycan/templates/selector/palettes/edit"];
    $(this.el).html(compiled(this.model.toJSON()));

    $('#main').html(this.el);

    $('#new-palette .picker').ColorPicker({
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

