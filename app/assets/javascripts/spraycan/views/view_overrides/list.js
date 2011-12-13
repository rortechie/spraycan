Spraycan.Views.ViewOverrides.List = Backbone.View.extend({
  initialize: function() {
    Spraycan.view = this;

    this.bind('editor:resize', this.handle_resize);

    this.handle_resize();
    Spraycan.animate_resize(this.calculate_size());
  },

  calculate_size: function(){
    return 300;
  },

  handle_resize: function(){
    this.render();
    var table_size = 195;

    if(Spraycan.editor.maximised){
      table_size = $(window).height() - 160;
    }

    $('table#view_overrides').tableScroll({height:table_size});

  },

  render: function() {
    var compiled = JST['spraycan/templates/view_overrides/index'];

    $(this.el).html(compiled({ collection : Spraycan.view_overrides }));
    $('#main').html(this.el);
  }

});
