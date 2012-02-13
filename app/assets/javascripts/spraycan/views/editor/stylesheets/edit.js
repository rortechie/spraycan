Spraycan.Views.Stylesheets.Edit = Backbone.View.extend({
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

    attrs = $('form#stylesheet_form').serializeObject();
    attrs.css = this.code_editor.getSession().getValue();

    this.model.save(attrs, {
      success: function(model, resp) {
        Spraycan.reload_frame();

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

  editor_changed: function(evt){
    Spraycan.view.set_change("css", Spraycan.view.code_editor.getSession().getValue());
  },

  set_change: function(name, value){
    var attrs = {};
    attrs[name] = value;

    this.model.set(attrs);
  },

  calculate_size: function() {
    var height = 0;

    if(Spraycan.editor.maximised){
      if(this.code_editor!=null){
        $(this.code_editor.container).height($(window).height() - 170);
        this.code_editor.resize();
      }

      height = ($(window).height() - 40);

    }else if(Spraycan.editor.minimised){
      //leave it at defaul
    }else{

      if(this.show_form){
        if(this.show_text_editor){
          if(this.code_editor!=null){
            $(this.code_editor.container).height(170);
            this.code_editor.resize();

            height += 340;
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

  apply_styles: function(evt) {
    Spraycan.view.editor_changed();

    //need to use Spraycan.view here as this is
    //an ACE callback, can't control 'this'
    var style_id = Spraycan.view.model.get('name')
    style_id = style_id.replace(/\//g, '-');
    style_id = style_id.replace(/.css/g, '');

    if(style_id==""){
       //tell user to set name first
    }else{

       if(frames[0].$jQ("style#" + style_id).length==0){
         frames[0].$jQ("head").append("<style id='" + style_id + "'></style>");
       }

       frames[0].$jQ("style#" + style_id).html(Spraycan.view.code_editor.getSession().getValue());
    }
  },

  render: function() {
    Spraycan.editor.minimised = false;
    Spraycan.editor.visible = true;

    var compiled = JST["spraycan/templates/editor/stylesheets/edit"];
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    var editor_height = 170;

    if(Spraycan.editor.maximised){
      editor_height = $(window).height() - 170;
    }

    if(this.model.get('css')==undefined){
      content = "p {}";
    }else{
      content = this.model.get('css');
    }

    $("#stylesheet_css").height(editor_height);
    this.code_editor = ace.edit("stylesheet_css");

    this.code_editor.setTheme("ace/theme/vibrant_ink");

    var css_mode = require("ace/mode/css").Mode;
    //disables lint check as it causes lots of errors in
    //firefox - should look at updating ACE and retesting
    css_mode.prototype.createWorker=function() {};
    this.code_editor.getSession().setTabSize(2);
    this.code_editor.getSession().setMode(new css_mode());
    this.code_editor.getSession().setValue(content);
    this.code_editor.getSession().doc.on('change', this.apply_styles);

    Spraycan.animate_resize(this.calculate_size());

    return this;
  }
});
