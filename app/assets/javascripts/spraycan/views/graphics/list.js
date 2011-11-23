Spraycan.Views.Graphics.List = Backbone.View.extend({
  events: {
    "click ul#all_graphics a": "load_graphic",
    "click li:not(.disabled) a[rel='new']": "new_graphic"
  },

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

      height = ($(window).height() - 50);

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
    Spraycan.view = this;

    var compiled = JST["spraycan/templates/graphics/index"];

    $(this.el).html(compiled({ collection : Spraycan.graphics }));
    $('#main').html(this.el);

    Spraycan.animate_resize();

    return this;
  },

  load_graphic: function(e) {
    var id = $(e.target).attr('data-graphic-id');
    var graphic = _.detect(Spraycan.graphics.models, function(g) { return g.id == id });

    this.model = graphic;

    var compiled = JST["spraycan/templates/graphics/show"];
    $('#graphic_details').html(compiled({ model : graphic }));

    $("a[rel='delete']").parent().removeClass('disabled');
  },

  new_graphic: function(e) {
    var compiled = JST["spraycan/templates/graphics/new"];
    $('#graphic_details').html(compiled());

    $("a[rel='delete']").parent().addClass('disabled');

    $('#file1').change(function() {
      $(this).upload('/spraycan/themes/' + Spraycan.theme_id + '/graphics', function(res) {
        Spraycan.graphics.fetch();
      }, 'script');
    });
  }
});
