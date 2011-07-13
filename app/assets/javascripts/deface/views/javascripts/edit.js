Deface.Views.Javascripts.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,

  events: {
    "click li:not(.disabled) a[rel='save']": "save",
    "click li:not(.disabled) a[rel='cancel']": "cancel",
    "change input" :"changed",
    "change select" :"changed"
  },

  initialize: function() {
    $(this.el).data('view', this);
    this.model = this.options.model;

    this.show_form = true;
    this.show_text_editor = true;
    this.render();
  },

  save: function() {
    Deface.clear_errors();

    attrs = $('form#javascript_form').serializeObject();
    attrs.js = this.code_editor.getSession().getValue();

    var isNew = this.model.isNew();

    Deface.increment_activity();

    this.model.save(attrs, {
      success: function(model, resp) {
        window.frames[0].location.reload();

        if(Deface.javascripts.get(model.get('id'))!=undefined){
          Deface.javascripts.remove(Deface.javascripts.get(model.get('id')), {silent: true});
        }

        Deface.javascripts.add(model);
        Deface.decrement_activity();

        $("a[rel='delete']").parent().removeClass('disabled');
        $("li:not(.disabled) a[rel='delete']").add_confirm_delete();
      },
      error: Deface.handle_save_error
    });

    return false;
  },

  cancel: function() {
    Deface.reset_editor();
    return false;
  },

  changed: function(evt) {
    var field = $(evt.currentTarget);
    var name = field.attr('name');

    if(name=='disabled'){
      this.set_change(name, field.is(":checked"));
    }else{
      this.set_change(name, field.val());
    }

  },

  editor_changed: function(){
    Deface.view.set_change("js", Deface.view.code_editor.getSession().getValue());
  },

  set_change: function(name, value){
    var attrs = {};
    attrs[name] = value;

    this.model.set(attrs);
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
      //leave it at defaul
    }else{

      if(this.show_form){
        if(this.show_text_editor){
          if(this.code_editor!=null){
            $(this.code_editor.container).height(170);
            this.code_editor.resize();

            height += 300;
          }
        }else{
          height += 80;
        }

        if(this.show_advanced){
          height += 30;
        }
      }

    }

    return height;
  },

  render: function() {
    Deface.editor.minimised = false;
    Deface.editor.visible = true;
    Deface.view = this;

    var compiled = JST["deface/templates/javascripts/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    var editor_height = 170;

    if(Deface.editor.maximised){
      editor_height = $(window).height() - 170;
    }

    $("#javascriptc_js").height(editor_height);
    this.code_editor = ace.edit("javascriptc_js");

    this.code_editor.setTheme("ace/theme/vibrant_ink");

    var js_mode = require("ace/mode/javascript").Mode;
    this.code_editor.getSession().setTabSize(2);
    this.code_editor.getSession().setMode(new js_mode());
    this.code_editor.getSession().setValue(this.model.get('js'));
    this.code_editor.getSession().doc.on('change', this.editor_changed);


    $("li:not(.disabled) a[rel='delete']").add_confirm_delete();

    Deface.animate_resize();

    return this;
  }
});
