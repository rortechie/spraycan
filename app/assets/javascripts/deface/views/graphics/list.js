Deface.Views.Graphics.List = Backbone.View.extend({
  events: {
    "click ul#all_graphics a": "load_graphic",
    "click li:not(.disabled) a[rel='new']": "new_graphic",
    "click li:not(.disabled) a[rel='delete']": "delete_graphic"
  },

  initialize: function() {
    this.render();
  },

  calculate_size: function() {
    var height = 0;

    if(Deface.editor.maximised){
      if(this.code_editor!=null){
        $(this.code_editor.container).height($(window).height() - 170);
        this.code_editor.resize();
      }

      height = ($(window).height() - 50);

    }else if(Deface.editor.minimised){
      //leave it at default 0
    }else{
      height += 300;
    }

    return height;
  },

  render: function() {
    Deface.editor.minimised = false;
    Deface.editor.visible = true;
    Deface.view = this;

    var compiled = JST["deface/templates/graphics/index"];

    $(this.el).html(compiled({ collection : Deface.graphics }));
    $('#main').html(this.el);

    Deface.animate_resize();

    return this;
  },

  load_graphic: function(e) {
    var id = $(e.target).attr('data-graphic-id');
    var graphic = _.detect(Deface.graphics.models, function(g) { return g.id == id });

    this.model = graphic;

    var compiled = JST["deface/templates/graphics/show"];
    $('#graphic_details').html(compiled({ model : graphic }));

    $("a[rel='delete']").parent().removeClass('disabled');
  },

  new_graphic: function(e) {
    var compiled = JST["deface/templates/graphics/new"];
    $('#graphic_details').html(compiled());

    $("a[rel='delete']").parent().addClass('disabled');

    $('#file1').change(function() {
      $(this).upload('/deface/themes/' + Deface.theme_id + '/graphics', function(res) {
        Deface.graphics.fetch();
      }, 'script');
    });
  },

  delete_graphic: function(e) {
    this.model.destroy();
    // Deface.graphics.remove(this.model);
  }

});

