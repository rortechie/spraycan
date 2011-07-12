Deface.Views.ViewOverrides.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,
  show_advanced: false,
  code_editor: null,

  events: {
    "click li:not(.disabled) a[rel='save']": "save",
    "click li:not(.disabled) a[rel='cancel']": "cancel",
    "click li:not(.disabled) a[rel='delete']": "delete",
    "click li:not(.disabled) a[rel='advanced']": "advanced",
    "change select[name='replace_with']": "set_replacement",
    "change select[name='target']": "set_replacement",
    "change input" :"changed",
    "change select" :"changed"
  },

  initialize: function() {
    $(this.el).data('view', this);
    this.show_form = true;
    this.model = this.options.model;
    this.render();
  },

  save: function() {
    Deface.clear_errors();

    attrs = $('form#view_override_form').serializeObject();
    if(attrs.disabled==undefined){
      attrs.disabled = false;
    }
    attrs.replace_text = this.code_editor.getSession().getValue();

    var isNew = this.model.isNew();

    // Deface.increment_activity();

    this.model.save(attrs, {
      success: function(model, resp) {
        window.frames[0].location.reload();

        if(Deface.view_overrides.get(model.get('id'))!=undefined){
          Deface.view_overrides.remove(Deface.view_overrides.get(model.get('id')), {silent: true});
        }

        Deface.view_overrides.add(model);

        $("a[rel='delete']").parent().removeClass('disabled');
      },
      error: Deface.handle_save_error
    });

    return false;
  },

  delete: function() {
    this.model.destroy();
    Deface.view_overrides.remove(this.model);

    Deface.reset_editor();
    return false;
  },

  cancel: function() {
    Deface.reset_editor();
    return false;
  },

  advanced: function() {
    this.show_advanced = !this.show_advanced ;
    Deface.animate_resize();
    $('#view_override_form .advanced').toggle();
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

  editor_changed: function(evt){
    this.set_change("replacement", this.code_editor.getSession().getValue());
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
        if(this.show_advanced){
          $(this.code_editor.container).height($(window).height() - 230);
        }else{
          $(this.code_editor.container).height($(window).height() - 170);
        }

        this.code_editor.resize();
      }

      height = ($(window).height() - 50);

    }else if(Deface.editor.minimised){
      //leave it at default 0
    }else{

      if(this.show_form){

        if(this.show_text_editor && this.code_editor!=null){
          $(this.code_editor.container).height(170);
          this.code_editor.resize();

          height += 300;
        }else{
          height += 80;
        }

        if(this.show_advanced){
          height += 60;
        }
      }
    }

    return height;
  },

  set_replacement: function() {
    var replacement = $("select[name='replace_with']").val();
    var target = $("select[name='target']").val();

    $('div#replace_withs > div').hide();
    $('div#replace_with_' + replacement).show();

    if(target=='remove'){
      $('div#replace_withs').hide();
      this.show_text_editor = false;
    }else{
      $('div#replace_withs').show();

      if(replacement=="text"){
        this.show_text_editor = true;
        var editor_height = 170;

        if(Deface.editor.maximised){
          editor_height = $(window).height() - 170;
        }

        $("#view_override_replace_text").height(editor_height);
        this.code_editor = ace.edit("view_override_replace_text");

        this.code_editor.setTheme("ace/theme/vibrant_ink");

        var html_mode = require("ace/mode/html").Mode;
        this.code_editor.getSession().setTabSize(2);
        this.code_editor.getSession().setMode(new html_mode());
        if(this.model.get('replacement')!=null){
          this.code_editor.getSession().setValue(this.model.get('replacement'));
        }

        this.code_editor.getSession().doc.on('change', function(evt){
          Deface.view.editor_changed();
        });

      }else if(target=="partial"){
        this.code_editor = null;
        $("#view_override_replace_parital").val(this.model.get('replacement'));
      }else if(target=="template"){
        this.code_editor = null;
        $("#view_override_replace_template").val(this.model.get('replacement'));
      }

    }

    Deface.animate_resize();

  },

  render: function() {
    Deface.editor.minimised = false;
    Deface.editor.visible = true;
    Deface.view = this;

    var compiled = JST['deface/templates/view_overrides/edit'];

    if(this.model.get('hook')!=undefined){
      hook_name = this.model.get('hook');

      var template = _.detect(Deface.templates.models, function(t) {
        return _.include(_.pluck(t.get('hooks'), 'name'), hook_name)
      } );

      var hook = _.detect(template.get('hooks'), function(h){
        return h.name == hook_name;
      });

      this.model.set( {virtual_path: template.get('name'), replacement: hook.source } );

      //todo finish this unset to remove hook attr
      this.model.unset('hook')
    }

    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    this.set_replacement();

    return this;
  }
});
