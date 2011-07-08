Deface.Views.ViewOverrides.List = Backbone.View.extend({
  events: {
    "click #load_override button": "load"
  },

  initialize: function() {
    this.render();
  },

  load: function() {
    Deface.editor.visible = true;

    var name = $("#all_view_overrides").val();
    model = _.detect(Deface.view_overrides.models, function(vo) { return vo.get('name') == name} );

    if(name!=""){
      if(name=="add-new"){
        var model = new ViewOverride();
      }

      Deface.view = new Deface.Views.ViewOverrides.Edit({ model: model });
    }

    return false;
  },

  render: function() {
    var compiled = JST['deface/templates/view_overrides/index'];

    $(this.el).html(compiled({ collection : Deface.view_overrides }));
    $('#loadables').html(this.el);

    $('iframe').height($(window).height() - 50);
  }

});
