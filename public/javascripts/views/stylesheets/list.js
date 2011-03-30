var load_stylesheet = (<r><![CDATA[
  <div id="load_stylesheet">
    <select id="all_stylesheets">
      <option value="add-new">Add New Stylesheet</option>
      <% collection.each(function(item) { %>
        <option><%= item.escape('name') %></option>
      <% }); %>
    </select>
    <button>ok</button>
  </div> ]]></r>).toString();

App.Views.Stylesheets.List = Backbone.View.extend({
    events: {
      "click #load_stylesheet button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      App.editor.visible = true;

      var name = $("#all_stylesheets").val();
      model = _.detect(App.stylesheets.models, function(vo) { return vo.get('name') == name} );

      if(name!=""){
        if(name=="add-new"){
          var model  = new top.Stylesheet({ name: '', css: ''});
        }

        App.view = new App.Views.Stylesheets.Edit({ model: model });
      }

      return false;
    },

    render: function() {
      var compiled = _.template(load_stylesheet);

      $(this.el).html(compiled({ collection : App.stylesheets }));
      $('#loadables').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});
