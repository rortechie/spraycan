Deface.Views.Stylesheets.List = Backbone.View.extend({
    events: {
      "click #load_stylesheet button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      Deface.editor.visible = true;

      var name = $("#all_stylesheets").val();
      model = _.detect(Deface.stylesheets.models, function(vo) { return $.trim(vo.get('name')) == name} );

      if(name!=""){
        if(name=="add-new"){
          var model  = new Stylesheet({ name: '', css: ''});
        }

        Deface.view = new Deface.Views.Stylesheets.Edit({ model: model });
      }

      return false;
    },

    render: function() {
      var compiled = JST['deface/templates/stylesheets/index'];

      $(this.el).html(compiled({ collection : Deface.stylesheets }));
      $('#loadables').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});
