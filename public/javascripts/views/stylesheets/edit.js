var edit = (<r><![CDATA[<form id="view_override_form">
  <h1>Stylesheet</h1>

  </form> ]]></r>).toString();

App.Views.Stylesheets.Edit = Backbone.View.extend({

  events: {
    "click a[rel='save']": "save",
    "click a[rel='delete']": "delete"
  },

  initialize: function() {
    $(this.el).data('view', this);
    this.model = this.options.model;
    this.render();
  },

  save: function() {
    attrs = $('form#view_override_form').serializeObject();

    var isNew = this.model.isNew();

    App.increment_activity();

    this.model.save(attrs, {
      success: function(model, resp) {
        window.frames[0].location.reload();

        if(App.view_overrides.get(model.get('id'))!=undefined){
          App.view_overrides.remove(App.view_overrides.get(model.get('id')), {silent: true});
        }

        App.view_overrides.add(model);

        $("a[rel='delete']").parent().removeClass('disabled');
      },
      error: function() {
        console.log('error');
      }
    });

    return false;
  },

  delete: function() {
    this.model.destroy();
    App.view_overrides.remove(this.model);
    return false;
  },

  calculate_size: function() {
    var height = 0;

    if(App.editor.maximised){
      height = ($(window).height() - 50);

    }else if(App.editor.minimised){
      //leave it at defaul
    }else{

      height += 30
    }

    return height;
  },

  render: function() {
    App.editor.minimised = false;
    App.view = this;

    var compiled = _.template(edit);
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    App.animate_resize();

    return this;
  }
});

