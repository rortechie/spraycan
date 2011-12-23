Spraycan.Views.Fonts.Edit = Backbone.View.extend({
  events: {
    "click .plus": "bigger",
    "click .minus": "smaller",
    "click button#save": "save"
  },

  initialize: function(opts) {
    // load google fonts
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);

    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/fonts/edit"];

    $(this.el).html(compiled({display_name: this.display_name, themes: this.themes}));
    $('#colors-container').html('');
    $('#design-container').html('');
    $('#fonts-container').html(this.el);
    $('#images-container').html('');

    $('#title_font').googleFontPicker({
      defaultFont: Spraycan.preferences.title_font,
      callbackFunc: function(fontFamily){
        $('#title_font_sample').css('fontFamily', fontFamily);
        $("input#preferred_title_font").val(fontFamily.split(',')[0]);
      }
    });

    $('#body_font').googleFontPicker({
      defaultFont: Spraycan.preferences.body_font,
      callbackFunc: function(fontFamily){
        $('#body_font_sample').css('fontFamily', fontFamily);
        $("input#preferred_body_font").val(fontFamily.split(',')[0]);
      }
    });

  },

  bigger: function(e){
    var target = $(e.currentTarget).attr('rel');
    var currentSize = parseInt($("#"+target+"_sample").css('fontSize'));
    $("#"+target+"_sample").css('fontSize',(currentSize+1)+'px');
    $("input#preferred_"+target+"_size").val(currentSize+1);
  },

  smaller: function(e){
    var target = $(e.currentTarget).attr('rel');
    var currentSize = parseInt($("#"+target+"_sample").css('fontSize'));
    $("#"+target+"_sample").css('fontSize',(currentSize-1)+'px');
    $("input#preferred_"+target+"_size").val(currentSize-1);
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
