var navigate = (<r><![CDATA[
  <div class="fields" style="width:500px;">
    <label>Url:</label>
    <input id="url" type="text" style="width:300px;" value="<%= url %>">
    <button>Go</button>
  </div>
]]></r>).toString();

App.Views.Shared.navigate = Backbone.View.extend({
  show_form: true,

  events: {
    "click button": "navigate"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    App.editor.minimised = false;
    App.editor.maximised = false;
    App.editor.visible = true;

    var compiled = _.template(navigate);
    $(this.el).html(compiled({ url : frames[0].location.href }));
    $('#main').html(this.el);

    App.view = this;
    App.animate_resize();
  },

  calculate_size: function() {
    var height = 0;
    if(this.show_form){
      height += 40;
    }

    return height;
  },

  navigate: function() {
    frames[0].location.href = $("input#url").val();

    App.editor.visible = false;
    this.show_form = false;
    App.animate_resize();
  }
});

