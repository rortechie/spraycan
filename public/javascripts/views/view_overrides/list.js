var list = (<r><![CDATA[<select id="all_view_overrides">
      <% collection.each(function(item) { %>
        <option><%= item.escape('name') %></option>
      <% }); %>
    </select>
    <button>ok</button>]]></r>).toString();

App.Views.ViewOverrides.List = Backbone.View.extend({
    events: {
      "click #load_override button": "load"
    },

    initialize: function() {
      this.render();
    },

    load: function() {
      var name = $("#all_view_overrides").val();

      model = _.detect(App.view_overrides.models, function(vo) { return vo.get('name') == name} );

      if(name==""){
        //clear_override();
      }else{
        new App.Views.ViewOverrides.Edit({ model: model });
      }

      $("div#deface_editor #load_override").fadeOut();
      return false;
    },

    render: function() {
      var compiled = _.template(list);

      $(this.el).html(compiled({ collection : this.collection }));
      $('#load_override').html(this.el);

      $('iframe').height($(window).height() - 50);
    }

});


