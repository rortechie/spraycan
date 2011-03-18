var navigate = (<r><![CDATA[
  <div class="fields" style="width:500px;">
    <label>Url:</label>
    <input id="url" type="text" style="width:300px;" value="<%= url %>">
    <button>Go</button>
  </div>
]]></r>).toString();

App.Views.Shared.navigate = Backbone.View.extend({

    events: {
      "click button": "navigate"
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      var compiled = _.template(navigate);
      $(this.el).html(compiled({ url : frames[0].location.href }));
      $('#main').html(this.el);

      $("div#deface_editor").animate({height: '90px'}, 500);
    },

    navigate: function() {
      console.log($("input#url").val());
      frames[0].location.href = $("input#url").val();
    }
});


