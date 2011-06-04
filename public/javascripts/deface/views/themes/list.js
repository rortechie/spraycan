var themes_list = (<r><![CDATA[
  <div id="themes_list">
    <table cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th style="width:5%;">&nbsp;</th>
          <th style="width:45%;">Name</th>
          <th style="width:23%;">Active</th>
          <th style="width:25%;">&nbsp;</th>
        </tr>
      </thead>
    </table>
    <div class="scroller">
      <table cellspacing="0" cellpadding="0">
        <tbody>
          <% collection.each(function(item) { %>
            <tr id="<%= item.attributes.id %>">
              <td class="handle" style="width:5%;">-</td>
              <td style="width:46%;">
                <%= item.attributes.name %>
              </td>
              <td style="width:25%;">
                <%= item.attributes.active ? 'Yes' : 'No' %>
              </td>
              <td style="width:25%;">
                <a class="edit" data-theme-id="<%= item.attributes.id %>" href="/deface#theme/<%= item.attributes.id %>">Edit</a>
                <% if(Deface.theme_id != item.attributes.id){ %>
                 | <a data-theme-id="<%= item.attributes.id %>" href="/deface#switch_theme/<%= item.attributes.id %>">Load</a>
                <% } %>
                | <a data-theme-id="<%= item.attributes.id %>" href="/deface/themes/<%= item.attributes.id %>/export">Export</a>
              </td>
            </tr>
          <% }); %>
        </tobdy>
      </table>
    </div>
  </div>
  <div id="edit_wrapper">
    <div id="theme_details">
    </div>
    <div id="actions">
      <ul class="buttons toggle">
        <li class="disabled"><a href="#" rel="delete">Delete</a></li>
        <li><a href="#" rel="new">New</a></li>
        <li class="disabled last"><a href="#" rel="save">Save</a></li>
      </ul>
    </div>
  </div>
]]></r>).toString();

var edit_theme = (<r><![CDATA[
    <form id="theme_form">
      <% if(model.attributes.id==undefined){ %>
        <h3>Create New Theme</h3>
      <% } %>
      <div class="fields">
        <label>Name:</label>
        <input name="name" type="text" value="<%= model.attributes.name %>">
      </div>
      <div class="fields">
        <label>Active:</label>
        <input name="active" value="true" type="checkbox" <%= model.attributes.active ? 'checked="checked"' : '' %>>
      </div>
    </form>
    <% if(model.attributes.id==undefined){ %>
      <hr>
      <h3>Import Existing Theme</h3>
      <div class="fields">
        <label>Import:</label>
        <input type="file" name="import" id="file1">
      </div>
    <% } %>
  </div>
]]></r>).toString();

Deface.Views.Themes.List = Backbone.View.extend({
  events: {
    "click #themes_list a.edit": "load_theme",
    "click li:not(.disabled) a[rel='new']": "new_theme",
    "click li:not(.disabled) a[rel='save']": "save_theme",
    "click li:not(.disabled) a[rel='delete']": "delete_theme"
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

    var compiled = _.template(themes_list);

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

        Deface.view.save_theme_record(theme, {position: new_position}); 

      }
    });

    Deface.animate_resize();

    return this;
  },

  load_theme: function(e) {
    var id = $(e.target).attr('data-theme-id');
    var theme = _.detect(Deface.themes.models, function(t) { return t.id == id });

    this.model = theme;

    var compiled = _.template(edit_theme);
    $('#theme_details').html(compiled({ model : this.model }));

    $("a[rel='delete']").parent().removeClass('disabled');
    $("a[rel='save']").parent().removeClass('disabled');
  },

  save_theme: function(e) {
    Deface.clear_errors();

    attrs = $('form#theme_form').serializeObject();

    this.save_theme_record(this.model, attrs)

    return false;
  },

  save_theme_record: function(theme, attrs){
    Deface.increment_activity();

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

    var compiled = _.template(edit_theme);

    $("a[rel='delete']").parent().addClass('disabled');
    $("a[rel='save']").parent().removeClass('disabled');

    $('#theme_details').html(compiled({ model : this.model }));

    $('#file1').change(function() {
      Deface.increment_activity();
      $("a[rel='save']").parent().addClass('disabled');

      $(this).upload('/deface/themes/import.js', function(res) {
        Deface.decrement_activity();

        frames[0].location.href = frames[0].location.href;
        Deface.themes.fetch();
      }, 'script');
    });

  },

  delete_theme: function(e) {
    this.model.destroy();
    // Deface.graphics.remove(this.model);
  }

});


