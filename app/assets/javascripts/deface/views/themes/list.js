Deface.Views.Themes.List = Backbone.View.extend({
  events: {
    "click #themes_list a.edit": "load_theme",
    "click li:not(.disabled) a[rel='new']": "new_theme",
    "click li:not(.disabled) a[rel='save']": "save_theme"
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

    var compiled = JST['deface/templates/themes/index'];

    $(this.el).html(compiled({ collection : Deface.themes }));
    $('#main').html(this.el);

    $('.scroller tbody').sortable({
      axis: 'y', 
      dropOnEmpty:false, 
      handle: '.handle', 
      cursor: 'crosshair',
      items: 'tr',
      opacity: 0.9,
      scroll: true,
      update: function(e,ui){
        var id = ui.item.attr('id');
        var new_position = ui.item.index('.scroller tbody tr')
        var theme = _.detect(Deface.themes.models, function(t) { return t.id == id });

        Deface.view.save_theme_record(theme,{position: new_position}); 
      }
    });

    Deface.animate_resize();

    return this;
  },

  load_theme: function(e) {
    var id = $(e.target).attr('data-theme-id');
    var theme = _.detect(Deface.themes.models, function(t) { return t.id == id });

    this.model = theme;

    var compiled = JST['deface/templates/themes/edit'];
    $('#theme_details').html(compiled({ model : this.model }));

    $("a[rel='delete']").parent().removeClass('disabled');
    $("a[rel='save']").parent().removeClass('disabled');

    $("li:not(.disabled) a[rel='delete']").add_confirm_delete();
  },

  save_theme: function(e) {
    Deface.clear_errors();

    attrs =  $('form#theme_form').serializeObject();
    if(attrs.active==undefined){
      attrs.active = false;
    }
    this.save_theme_record(this.model, attrs)

    return false;
  },

  save_theme_record: function(theme, attrs){
    Deface.increment_activity("Saving theme");

    theme.save(attrs, {
      success: function(model, resp) {
        frames[0].location.href = frames[0].location.href;

        if(Deface.themes.get(model.get('id'))!=undefined){
          Deface.themes.remove(Deface.themes.get(model.get('id')), {silent: true});
        }

        Deface.themes.add(model);
      },
      error: Deface.handle_save_error
    });
  },

  new_theme: function(e) {
    this.model = new Theme();

    var compiled = JST['deface/templates/themes/edit'];

    $("a[rel='delete']").parent().addClass('disabled');
    $("a[rel='save']").parent().removeClass('disabled');

    $('#theme_details').html(compiled({ model : this.model }));

    $('#file1').change(function() {
      Deface.increment_activity("Uploading theme");
      $("a[rel='save']").parent().addClass('disabled');

      $(this).upload('/deface_editor/themes/import.js', function(res) {
        Deface.decrement_activity();

        frames[0].location.href = frames[0].location.href;
        Deface.themes.fetch();
      }, 'script');
    });
  }

});
