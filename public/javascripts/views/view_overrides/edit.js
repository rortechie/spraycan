var edit = (<r><![CDATA[<form id="view_override_form">
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
        <input type="checkbox" value="1" name="disabled" "<%= disabled ? 'checked' : '' %>">
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
          <% _.each(App.templates.models, function(template) { %>
            <option <%= template.attributes.name==virtual_path ? 'selected' : '' %>><%= template.attributes.name %></option>
          <% }); %>
        </select>
      </div>

      <div class="fields advanced">
        <label>Selector:</label>
        <input type="text" size="30" name="selector" value="<%= selector %>">
      </div>

      <div class="fields advanced" id="closing_selector_wrapper">
        <label>End Selector:</label>
        <input type="text" size="30" name="closing_selector">
      </div>

      <div class="clear" id="replace_withs">
        <div class="replacement" id="replace_with_text">
          <div class="fields">
            <label>Text:</label>
          </div>
          <pre id="view_override_replace_text"><p>I'm a p</p></pre>
        </div>

        <div style="display: none;" class="fields replacement" id="replace_with_partial">
          <label>Partial:</label>
          <input type="text" size="30" name="replace_parital" disabled="disabled">
        </div>

        <div style="display: none;" class="fields replacement" id="replace_with_template">
          <label>Template:</label>
          <input type="text" size="30" name="replace_template" disabled="disabled">
        </div>
      </div>

      <div id="actions">
        <ul class="buttons top">
          <li class="last"><a rel="advanced" href="#">Advanced</a></li>
        </ul>

        <ul class="buttons bottom">
          <li class="last"><a rel="delete" href="#">Delete</a></li>
          <li class="last"><a rel="save" href="#">Save</a></li>
        </ul>

      </div>

  </form> ]]></r>).toString();

App.Views.ViewOverrides.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,
  show_advanced: false,

  events: {
    "click a[rel='save']": "save",
    "click a[rel='delete']": "delete",
    "click a[rel='advanced']": "advanced",
  },

  initialize: function() {
    $(this.el).data('view', this);
    this.model = this.options.model;
    this.render();
  },

  save: function() {
    attrs = $('form#view_override_form').serializeObject();
    attrs.replace_text = editor.getSession().getValue();

    var isNew = this.model.isNew();

    this.model.save(attrs, {
      success: function(model, resp) {
        window.frames[0].location.reload();


        if(App.view_overrides.get(1)!=undefined){
          App.view_overrides.remove(App.view_overrides.get(1), {silent: true});
        }

        App.view_overrides.add(model);
      },
      error: function() {
        console.log('error');
      }
    });

    return false;
  },

  delete: function() {
    console.log('delete');
  },

  advanced: function() {
    this.show_advanced = !this.show_advanced;
    this.resize_editor();
    $('#view_override_form .advanced').toggle();
  },

  resize_editor: function() {
    var height = 50;

    if(this.show_form){
      height += 50
    }

    if(this.show_text_editor){
      height += 280
    }

    if(this.show_advanced){
      height += 30
    }

    animate_resize(height);

  },

  render: function() {
    var compiled = _.template(edit);

    if(this.model.get('hook')!=undefined){
      hook_name = this.model.get('hook');

      var template = _.detect(App.templates.models, function(t) {
        return _.include(_.pluck(t.get('hooks'), 'name'), hook_name)
      } );

      var hook = _.detect(template.get('hooks'), function(h){
        return h.name == hook_name;
      });

      this.model.set( {virtual_path: template.get('name'), replacement: hook.source } );


      //todo finih this unset to remove hook attr
      this.model.unset('hook')
    }


    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    if(this.model.get('replace_with')=="text"){
      editor = ace.edit("view_override_replace_text");
      editor.setTheme("ace/theme/twilight");

      var html_mode = require("ace/mode/html").Mode;
      editor.getSession().setMode(new html_mode());
      if(this.model.get('replacement')!=null){
        editor.getSession().setValue(this.model.get('replacement'));
      }

      this.show_text_editor = true;

    }else if(this.model.get('target')=="partial"){
      this.show_text_editor = false;
      $("#view_override_replace_parital").val(this.model.get('replacement'));
    }else if(this.model.get('target')=="template"){
      this.show_text_editor = false;
      $("#view_override_replace_template").val(this.model.get('replacement'));
    }

    this.resize_editor();
  }
});
