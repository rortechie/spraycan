Spraycan.Views.Stylesheets.List = Backbone.View.extend({
    events: {
      "click #load_stylesheet button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      Spraycan.editor.visible = true;

      var name = $("#all_stylesheets").val();
      model = _.detect(Spraycan.stylesheets.models, function(vo) { return $.trim(vo.get('name')) == name} );

      if(name!=""){
        if(name=="add-new"){
          var model  = new Stylesheet({ name: '', css: ''});
        }

        Spraycan.view = new Spraycan.Views.Stylesheets.Edit({ model: model });
      }

      return false;
    },

    render: function() {
      var compiled = JST['spraycan/templates/stylesheets/index'];

      $(this.el).html(compiled({ collection : Spraycan.stylesheets }));
      $('#loadables').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});
