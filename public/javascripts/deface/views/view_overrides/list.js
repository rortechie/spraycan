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

Deface.Views.ViewOverrides.List = Backbone.View.extend({
    events: {
      "click #load_override button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      Deface.editor.visible = true;

      var name = $("#all_view_overrides").val();
      model = _.detect(Deface.view_overrides.models, function(vo) { return vo.get('name') == name} );

      if(name!=""){
        if(name=="add-new"){
          var model = new ViewOverride({target: 'replace', disabled: false, replace_with: 'text', virtual_path: '', selector: '', replacement: ''});
        }

        Deface.view = new Deface.Views.ViewOverrides.Edit({ model: model });
      }

      return false;
    },

    render: function() {
      var compiled = _.template(load_override);

      $(this.el).html(compiled({ collection : Deface.view_overrides }));
      $('#loadables').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});
