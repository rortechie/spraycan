var stylesheet_edit = (<r><![CDATA[<form id="stylesheet_form">
  <div>
    <div class="fields">
      <label>Name:</label>
      <input type="text" size="30" name="name" value="<%= name %>">
    </div>
    <div class="clear">
      <div class="fields">
        <label>CSS:</label>
      </div>
      <pre id="stylesheet_css" class="small_editor">p {}</pre>
    </div>
  </div>
  <div id="actions">
    <ul class="buttons toggle">
      <li class="<%= typeof(id)  == "undefined" ? 'disabled' : '' %>"><a rel="delete" href="#">Delete</a></li>
      <li><a rel="cancel" href="#">Cancel</a></li>
      <li class="last"><a rel="save" href="#">Save</a></li>
    </ul>
  </div>
</form> ]]></r>).toString();

Deface.Views.Stylesheets.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,

  events: {
    "click a[rel='save']": "save",
    "click a[rel='cancel']": "cancel",
    "click a[rel='delete']": "delete"
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

    attrs = $('form#stylesheet_form').serializeObject();
    attrs.css = this.code_editor.getSession().getValue();

    var isNew = this.model.isNew();

    Deface.increment_activity();

    this.model.save(attrs, {
      success: function(model, resp) {
        if(Deface.stylesheets.get(model.get('id'))!=undefined){
          Deface.stylesheets.remove(Deface.stylesheets.get(model.get('id')), {silent: true});
        }

        Deface.stylesheets.add(model);

        $("a[rel='delete']").parent().removeClass('disabled');
      },
      error: Deface.handle_save_error
    });

    return false;
  },

  cancel: function() {
    Deface.reset_editor();
    return false;
  },

  delete: function() {
    if(frames[0].$jQ("style#" + this.model.name).length==1){
      frames[0].$jQ("style#" + this.model.name).remove();
    }

    this.model.destroy();
    Deface.view_overrides.remove(this.model);

    Deface.reset_editor();
    return false;
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

  apply_styles: function() {
    var id = Deface.view.model.get('id')

    if(frames[0].$jQ("style#" + id).length==0){
      frames[0].$jQ("head").append("<style id='" + id + "'></style>");
    }

    frames[0].$jQ("style#" + id).html(Deface.view.code_editor.getSession().getValue());
  },

  render: function() {
    Deface.editor.minimised = false;
    Deface.editor.visible = true;
    Deface.view = this;

    var compiled = _.template(stylesheet_edit);
    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    var editor_height = 170;

    if(Deface.editor.maximised){
      editor_height = $(window).height() - 170;
    }

    $("#stylesheet_css").height(editor_height);
    this.code_editor = ace.edit("stylesheet_css");

    this.code_editor.setTheme("ace/theme/twilight");

    var css_mode = require("ace/mode/css").Mode;
    this.code_editor.getSession().setMode(new css_mode());
    this.code_editor.getSession().setValue(this.model.get('css'));
    this.code_editor.getSession().doc.on('change', this.apply_styles);


    Deface.animate_resize();

    return this;
  }
});
