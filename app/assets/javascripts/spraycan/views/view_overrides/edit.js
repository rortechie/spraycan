Spraycan.Views.ViewOverrides.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,
  show_advanced: false,
  code_editor: null,

  events: {
    "click button[rel='save']:not(.disabled)": "save",
    "click a[rel='advanced']:not(.disabled)": "advanced",
    "change select[name='replace_with']": "set_replacement",
    "change select[name='target']": "set_replacement",
    "change input" :"changed",
    "change select" :"changed"
  },

  initialize: function() {
    Spraycan.view = this;

    $(this.el).data('view', this);
    this.show_form = true;
    this.model = this.options.model;
    this.render();
  },

  save: function() {
    Spraycan.clear_errors();

    attrs = $('form#view_override_form').serializeObject();
    if(attrs.disabled==undefined){
      attrs.disabled = false;
    }
    attrs.replace_text = this.code_editor.getSession().getValue();

    var isNew = this.model.isNew();

    this.model.save(attrs, {
      success: function(model, resp) {
        Spraycan.reload_frame();

        $("a[rel='delete']").html('Delete');
      },
      error: Spraycan.handle_save_error
    });

    return false;
  },

  close: function(){
    current = this.model;

    if(current.id==undefined){


      _.each(Spraycan.view_overrides.models, function(override){
        if(override.cid == current.cid){
          Spraycan.view_overrides.remove(override);
        }
      });

    }else if(current.changed==true){
     console.log(current);
    }

    window.location.href = "/spraycan#view_override?all";
    return false;
  },

  advanced: function() {
    this.show_advanced = !this.show_advanced ;
    Spraycan.animate_resize(this.calculate_size());
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
    Spraycan.view.set_change("replacement", Spraycan.view.code_editor.getSession().getValue());
  },

  set_change: function(name, value){
    var attrs = {};
    attrs[name] = value;

    this.model.set(attrs);
  },

  calculate_size: function() {
    var height = 60;

    if(Spraycan.editor.maximised){
      if(this.code_editor!=null){
        if(this.show_advanced){
          $(this.code_editor.container).height($(window).height() - 230);
        }else{
          $(this.code_editor.container).height($(window).height() - 170);
        }

        this.code_editor.resize();
      }

      height = ($(window).height() - 50);

    }else if(Spraycan.editor.minimised){
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
        var editor_height = 17

        if(Spraycan.editor.maximised){
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

        this.code_editor.getSession().doc.on('change', this.editor_changed, {view: this});

      }else if(target=="partial"){
        this.code_editor = null;
        $("#view_override_replace_parital").val(this.model.get('replacement'));
      }else if(target=="template"){
        this.code_editor = null;
        $("#view_override_replace_template").val(this.model.get('replacement'));
      }

    }

    Spraycan.animate_resize(this.calculate_size());

  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST['spraycan/templates/view_overrides/edit'];

    if(this.model.get('hook')!=undefined){
      hook_name = this.model.get('hook');

      if(hook_name=="new_override"){
      }else{
        var details = Spraycan.get_hook_details(hook_name)

        this.model.set( {virtual_path: details['virtual_path'], replacement: details['source'] } );
      }

      //todo finish this unset to remove hook attr
      this.model.unset('hook')
    }

    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    this.set_replacement();

    return this;
  }
});
