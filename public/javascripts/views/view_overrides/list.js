var load_override = (<r><![CDATA[
  <div id="load_override">
    <select id="all_view_overrides">
      <option value="add-new">Add New Override</option>
      <% collection.each(function(item) { %>
        <option><%= item.escape('name') %></option>
      <% }); %>
    </select>
    <button>ok</button>
  </div>]]></r>).toString();

App.Views.ViewOverrides.List = Backbone.View.extend({
    events: {
      "click #load_override button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      App.editor.visible = true;

      var name = $("#all_view_overrides").val();
      model = _.detect(App.view_overrides.models, function(vo) { return vo.get('name') == name} );

      if(name!=""){
        if(name=="add-new"){
          var model = new top.ViewOverride({target: 'replace', disabled: false, replace_with: 'text', virtual_path: '', selector: '', replacement: ''});
        }

        App.view = new App.Views.ViewOverrides.Edit({ model: model });
      }

      return false;
    },

    render: function() {
      var compiled = _.template(load_override);

      $(this.el).html(compiled({ collection : App.view_overrides }));
      $('#loadables').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});
