var graphics_list = (<r><![CDATA[
  <div id="graphics_list" class="file_list scroller">
    <ul id="all_graphics">
      <% collection.each(function(item) { %>
        <li>
          <a href="#" data-graphic-id="<%= item.attributes.id %>"><%= _.last(item.attributes.url.split('/')) %></a>
        </li>
      <% }); %>
    </ul>
  </div>
  <div id="edit_wrapper">
    <div id="graphic_details">
    </div>
    <div id="actions">
      <ul class="buttons toggle">
        <li class="disabled"><a href="#" rel="delete">Delete</a></li>
        <li class="last"><a href="#" rel="new">New</a></li>
      </ul>
    </div>
  </div>
 
]]></r>).toString();

var show_graphic = (<r><![CDATA[
    <div id="graphic_preview">
      <img src="<%= model.attributes.url %>">
    </div>
    <div class="fields">
      <label>Name:</label>
      <span><%= _.last(model.attributes.url.split('/')) %></span>
    </div>
    <div class="fields">
      <label>Path:</label>
      <span><%= model.attributes.url %></span>
    </div>
  </div>
]]></r>).toString();

var new_graphic = (<r><![CDATA[
  <div class="fields">
    <label>Upload:</label>
    <input type="file" name="graphic[file]" id="file1">
  </div>
]]></r>).toString();


Deface.Views.Graphics.List = Backbone.View.extend({
  events: {
    "click ul#all_graphics a": "load_graphic",
    "click li:not(.disabled) a[rel='new']": "new_graphic",
    "click li:not(.disabled) a[rel='delete']": "delete_graphic"
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

    var compiled = _.template(graphics_list);

    $(this.el).html(compiled({ collection : Deface.graphics }));
    $('#main').html(this.el);

    Deface.animate_resize();

    return this;
  },

  load_graphic: function(e) {
    var id = $(e.target).attr('data-graphic-id');
    var graphic = _.detect(Deface.graphics.models, function(g) { return g.id == id });

    this.model = graphic;

    var compiled = _.template(show_graphic);
    $('#graphic_details').html(compiled({ model : graphic }));

    $("a[rel='delete']").parent().removeClass('disabled');
  },

  new_graphic: function(e) {
    var compiled = _.template(new_graphic);
    $('#graphic_details').html(compiled());

    $("a[rel='delete']").parent().addClass('disabled');

    $('#file1').change(function() {
      $(this).upload('/deface/themes/' + Deface.theme_id + '/graphics', function(res) {
        Deface.graphics.fetch();
      }, 'script');
    });
  },

  delete_graphic: function(e) {
    this.model.destroy();
    // Deface.graphics.remove(this.model);
  }

});

