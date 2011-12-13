Spraycan.Routers.Tweaker = Backbone.Router.extend({
  routes: {
    "design": "design",
    "design/layouts": "design_layouts"
  },

  design: function(){
    var compiled = JST["spraycan/templates/navigation/design"];
    $('#design-container').html(compiled());
  },

  design_layouts: function(){
    new Spraycan.Views.Layouts.Index();
  }

});

