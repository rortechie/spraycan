Spraycan.Views.Fonts.Edit = Backbone.View.extend({
  events: {
    "submit form": "save"
  },

  initialize: function(opts) {


    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/selector/fonts/edit"];

    $(this.el).html(compiled({display_name: this.display_name, themes: this.themes}));
    $('#main').html(this.el);

    $("#spreeworks-editor .tabs .active").removeClass('active');
    $("#spreeworks-editor .tabs .fonts").addClass('active');

    $("#spreeworks-editor .content")
      .removeClass('active-layouts active-colors active-fonts active-images')
      .addClass('active-fonts')
      .find(".tab.active")
      .hide()
      .removeClass('active');

    $("#spreeworks-editor .content")
      .show()
      .find(".tab#tab-fonts")
      .show()
      .addClass('active');

    $('#title_font').googleFontPicker({
      defaultFont: Spraycan.preferences.title_font,
      callbackFunc: function(fontFamily){
        $("#"+this.id.split('fontbox')[1]).parent().find('.font-preview').css('fontFamily', fontFamily);   
        $("input#preferred_title_font").val(fontFamily.split(',')[0]);
      }
    });

    $('#body_font').googleFontPicker({
      defaultFont: Spraycan.preferences.body_font,
      callbackFunc: function(fontFamily){
        $("#"+this.id.split('fontbox')[1]).parent().find('.font-preview').css('fontFamily', fontFamily);   
        $("input#preferred_body_font").val(fontFamily.split(',')[0]);
      }
    });

    $("#tab-fonts .slider").each(function(){
      var size_el = $(this).next().find('input');
      var size_value = parseInt(size_el.attr('value'));

      var slider = $(this).slider({
        range: "min",
        value: size_value,
        min: 1,
        max: 30,    
        slide: function(event, ui) {
          size_el.val(ui.value)
        }
      });

      size_el.keyup(function(){
        slider.slider("value", parseInt(size_el.attr('value')));
      });
    });

  },

  save: function(event){
    event.preventDefault();
    // Spraycan.clear_errors();

    attrs = $('form#fonts_form').serializeObject();

    prefs = new Spraycan.Collections.Preferences();

    _.each(attrs, function(value, key){
      prefs.add({
        configuration: "Spraycan::Config",
        name: key,
        value: value
      });
    });

    Backbone.sync('create', prefs, {
      success: function(model, resp) {
        Spraycan.reload_frame();
      },
      error: Spraycan.handle_save_error
    });

 
    return false;

   }

});
