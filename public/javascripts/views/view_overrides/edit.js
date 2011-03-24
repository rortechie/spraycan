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
        <ul class="buttons ">
          <li class="<%= typeof(id)  == "undefined" ? 'disabled' : '' %>"><a rel="delete" href="#">Delete</a></li>
          <li class="last"><a rel="save" href="#">Save</a></li>
        </ul>

        <ul class="buttons ">
          <li class="last"><a rel="advanced" href="#">Advanced</a></li>
        </ul>

      </div>

  </form> ]]></r>).toString();

App.Views.ViewOverrides.Edit = Backbone.View.extend({
  show_form: false,
  show_text_editor: false,
  show_advanced: false,
  code_editor: null,

  events: {
    "click a[rel='save']": "save",
    "click a[rel='delete']": "delete",
    "click a[rel='advanced']": "advanced",
    "change select[name='replace_with']": "set_replacement",
    "change select[name='target']": "set_target"
  },

  initialize: function() {
    $(this.el).data('view', this);
    this.model = this.options.model;
    this.render();
  },

  save: function() {
    attrs = $('form#view_override_form').serializeObject();
    attrs.replace_text = this.code_editor.getSession().getValue();

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

  advanced: function() {
    this.show_advanced = !this.show_advanced ;
    App.animate_resize();
    $('#view_override_form .advanced').toggle();
    return false;
  },

  calculate_size: function() {
    var height = 0;

    if(App.editor.maximised){
      if(this.code_editor!=null){
        $(this.code_editor.container).height($(window).height() - 170);
        this.code_editor.resize();
      }

      height = ($(window).height() - 50);

    }else if(App.editor.minimised){
      //leave it at defaul
    }else{

      if(this.show_form){
        height += 50;
      }

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

    return height;
  },

  set_replacement: function() {
    var replacement = $("select[name='replace_with']").val();

    $('div#replace_withs > div').hide();
    $('div#replace_with_' + replacement).show();

    this.show_text_editor = (replacement=='text');
    App.animate_resize();
  },

  set_target: function(){
    var target = $("select[name='target']").val();
    console.log("setting target", target);

    if(target=='remove'){
      this.show_text_editor = false;

      $('#closing_selector_wrapper').hide();
      $('div#replace_withs').hide();
    }else{
      var replacement = $("select[name='replace_with']").val();
      if(replacement=='text'){
        this.show_text_editor = true;
      }

      if(this.show_advanced){
        $('#closing_selector_wrapper').show();
      }

      $('div#replace_withs').show();
    }

    App.animate_resize();

  },

  render: function() {
    App.editor.minimised = false;
    App.view = this;

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

      //todo finish this unset to remove hook attr
      this.model.unset('hook')
    }

    $(this.el).html(compiled(this.model.toJSON()));
    $('#main').html(this.el);

    if(this.model.get('replace_with')=="text"){
      this.show_text_editor = true;
      var editor_height = 170;

      if(App.editor.maximised){
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

    }else if(this.model.get('target')=="partial"){
      this.code_editor = null;
      $("#view_override_replace_parital").val(this.model.get('replacement'));
    }else if(this.model.get('target')=="template"){
      this.code_editor = null;
      $("#view_override_replace_template").val(this.model.get('replacement'));
    }

    App.animate_resize();

    return this;
  }
});
