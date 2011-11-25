Spraycan.Views.Javascripts.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,

  events: {
    "click button[rel='save']:not(.disabled)": "save",
    "change input" :"changed",
    "change select" :"changed"
  },

  initialize: function() {
    Spraycan.view = this;

    $(this.el).data('view', this);
    this.model = this.options.model;

    this.show_form = true;
    this.show_text_editor = true;
    this.render();
  },

  save: function() {
    Spraycan.clear_errors();

    attrs = $('form#javascript_form').serializeObject();
    attrs.js = this.code_editor.getSession().getValue();

    var isNew = this.model.isNew();

    this.model.save(attrs, {
      success: function(model, resp) {

        $("a[rel='delete']").html('Delete');
      },
      error: Spraycan.handle_save_error
    });

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
    Spraycan.view.set_change("js", Spraycan.view.code_editor.getSession().getValue());
  },

  set_change: function(name, value){
    var attrs = {};
    attrs[name] = value;

    this.model.set(attrs);
  },

  calculate_size: function() {
    var height = 40;

    if(Spraycan.editor.maximised){
      if(this.code_editor!=null){
        $(this.code_editor.container).height($(window).height() - 170);
        this.code_editor.resize();
      }

      height = ($(window).height() - 50);

    }else if(Spraycan.editor.minimised){
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
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/javascripts/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    var editor_height = 170;

    if(Spraycan.editor.maximised){
      editor_height = $(window).height() - 170;
    }

    if(this.model.get('js')==undefined){
      content = "function foo(){\n}";
    }else{
      content = this.model.get('js');
    }

    $("#javascriptc_js").height(editor_height);
    this.code_editor = ace.edit("javascriptc_js");

    this.code_editor.setTheme("ace/theme/vibrant_ink");

    var js_mode = require("ace/mode/javascript").Mode;
    //disables lint check as it causes lots of errors in
    //firefox - should look at updating ACE and retesting
    js_mode.prototype.createWorker=function() {};
    this.code_editor.getSession().setTabSize(2);
    this.code_editor.getSession().setMode(new js_mode());
    this.code_editor.getSession().setValue(content);
    this.code_editor.getSession().doc.on('change', this.editor_changed);

    Spraycan.animate_resize(this.calculate_size());

    return this;
  }
});
