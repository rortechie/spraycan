Spraycan.Views.Stylesheets.List = Backbone.View.extend({
  initialize: function() {
    this.bind('editor:resize', this.handle_resize);

    this.handle_resize();
    Spraycan.animate_resize(this.calculate_size());
  },

  render: function() {
    var compiled = JST['spraycan/templates/stylesheets/index'];

    $(this.el).html(compiled({ collection : Spraycan.stylesheets }));
    $('#main').html(this.el);

    $('iframe').height($(window).height() - 40);
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

    $('table#stylesheets').tableScroll({height:table_size});

  },

});
