var viewoverride_edit = (<r><![CDATA[<form id="view_override_form">
    <div>
      <div class="fields">
        <label>Name:</label>
        <input type="text" size="30" name="name" value="<%= name %>">
      </div>

      <div class="fields">
        <label>Action:</label>
        <select name="target" id="view_override_target">
          <% _.each(['remove', 'replace', 'insert_after', 'insert_before', 'insert_top', 'insert_bottom'], function(_target) { %>
            <option <%= _target==target ? 'selected' : '' %>><%= _target %></option>
          <% }); %>
        </select>
      </div>

      <div class="fields">
        <label>Disabled:</label>
        <input type="checkbox" value="true" name="disabled" <%= disabled ? 'checked="checked"' : '' %>>
      </div>

      <div class="fields advanced clear">
        <label>Replace With:</label>
        <select name="replace_with">
          <% _.each(['text', 'partial', 'template'], function(_replace_with) { %>
            <option <%= _replace_with==replace_with ? 'selected' : '' %>><%= _replace_with %></option>
          <% }); %>
        </select>
      </div>

      <div class="fields advanced">
        <label>Virtual Path:</label>
        <select name="virtual_path">
          <% _.each(Deface.templates.models, function(template) { %>
            <option <%= template.attributes.name==virtual_path ? 'selected' : '' %>><%= template.attributes.name %></option>
          <% }); %>
        </select>
      </div>

      <div class="fields advanced">
        <label>Sequence:</label>
        <select name="sequence" style="width:80px;">
          <option <%= "before"==sequence ? 'selected' : '' %>>before</option>
          <option <%= "after"==sequence ? 'selected' : '' %>>after</option>
        </select>
        <select name="sequence_target" style="width:120px;">
          <option <%= ""==sequence_target ? 'selected' : '' %>> </option>
          <% _.each(Deface.view_overrides.models, function(view_override) { %>
            <% if(view_override.attributes.name!=name){ %>
              <option <%= view_override.attributes.name==sequence_target ? 'selected' : '' %>><%= view_override.attributes.name %></option>
            <% } %>
          <% }); %>
        </select>
      </div>

      <div class="fields advanced clear">
        <label>Selector:</label>
        <input type="text" size="30" name="selector" value="<%= selector %>">
      </div>

      <div class="fields advanced" id="closing_selector_wrapper">
        <label>End Selector:</label>
        <input type="text" size="30" name="closing_selector">
      </div>

      <div style="display: <%= target!='remove' ? 'block' : 'none' %>;" class="clear" id="replace_withs">
        <div class="replacement" id="replace_with_text">
          <div class="fields">
            <label>Text:</label>
          </div>
          <pre id="view_override_replace_text" class="small_editor"><p>I am a p.</p></pre>
        </div>

        <div class="fields replacement" id="replace_with_partial">
          <label>Partial:</label>
          <input type="text" size="30" name="replace_parital" disabled="disabled">
        </div>

        <div class="fields replacement" id="replace_with_template">
          <label>Template:</label>
          <input type="text" size="30" name="replace_template" disabled="disabled">
        </div>
      </div>

      <div id="actions">
        <ul class="buttons toggle">
          <li class="<%= typeof(id)  == "undefined" ? 'disabled' : '' %>"><a rel="delete" href="#">Delete</a></li>
          <li><a rel="cancel" href="#">Cancel</a></li>
          <li class="last"><a rel="save" href="#">Save</a></li>
        </ul>

        <ul class="buttons ">
          <li class="last"><a rel="advanced" href="#">Advanced</a></li>
        </ul>

      </div>

  </form> ]]></r>).toString();

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
    save_attrs = new Object;
    save_attrs.view_override = attrs;

    var isNew = this.model.isNew();

    Deface.increment_activity();

    this.model.save(save_attrs, {
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
        $(this.code_editor.container).height($(window).height() - 170);
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

        this.code_editor.setTheme("ace/theme/twilight");

        var html_mode = require("ace/mode/html").Mode;
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

    var compiled = _.template(viewoverride_edit);

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
