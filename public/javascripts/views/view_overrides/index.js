var index = (<r><![CDATA[<ul class="buttons small toggle">
    <li class="first <%= (App.editor.maximised || App.editor.visible) ? '' : 'disabled' %>" id="min">
      <a rel="min" href="#">_</a>
    </li>
    <li class="<%= App.editor.maximised ? '' : 'disabled' %>" id="restore">
      <a rel="restore" href="#">-</a>
    </li>
    <li class="last <%= (!App.editor.maximised && App.editor.visible) ? '' : 'disabled' %>" id="max">
      <a rel="max" href="#">&oline;</a>
    </li>
  </ul>
  <div id="load_override">
    <select id="all_view_overrides">
      <% collection.each(function(item) { %>
        <option><%= item.escape('name') %></option>
      <% }); %>
    </select>
    <button>ok</button>
  </div>
  <ul class="buttons toggle">
    <li class="first"><a rel="navigate" href="#">Go</a></li>
    <li class="last <%= collection.size() == 0 ? 'disabled' : '' %>"><a rel="load" href="#">Load</a></li>
  </ul>

  <ul class="buttons small toggle">
    <li class="first"><a rel="zoom-in" href="#">+</a></li>
    <li class="last"><a rel="zoom-out" href="#">-</a></li>
  </ul>

  <ul class="buttons toggle" style="display:none;">
    <li class="first active"><a rel="html" href="#">HTML</a></li>
    <li><a rel="css" href="#">CSS</a></li>
    <li class="last"><a rel="layout" href="#">Layout</a></li>
  </ul> ]]></r>).toString();


App.Views.ViewOverrides.Index = Backbone.View.extend({
    last_editor_height: 50,

    events: {
      "click a[rel='navigate']": "navigate",
      "click a[rel='min']": "minimise",
      "click a[rel='restore']": "restore",
      "click a[rel='max']": "maximise",
      "click a[rel='zoom-in']": "zoom_in",
      "click a[rel='zoom-out']": "zoom_out",
      "click a[rel='load']": "show_load"
    },

    initialize: function() {
      this.render();
    },

    minimise: function() {
      if(App.editor.visible){
        this.last_editor_height = $("div#deface_editor").height();
        App.editor.maximised = false;
        App.editor.minimised = true;
        animate_resize(50);
      }
      return false;
    },

    restore: function() {
      if(App.editor.visible){
        this.last_editor_height = $("div#deface_editor").height();
        App.editor.maximised = false;
        App.editor.minimised = false;

        if(App.view!=undefined){
          App.view = new App.Views.ViewOverrides.Edit({ model: App.view.model });
        }
      }

      return false;
    },

    maximise: function() {
      if(App.editor.visible){
        this.last_editor_height = $("div#deface_editor").height();
        App.editor.maximised = true;
        App.editor.minimised = false;

        if(App.view!=undefined){
          App.view = new App.Views.ViewOverrides.Edit({ model: App.view.model });
        }

        animate_resize($(window).height());
      }

      return false;
    },

    show_load: function() {
      if($("a[rel='load']").parent().hasClass('disabled')){
        return false;
      }

      $("div#deface_editor #load_override").fadeIn();
      return false;
    },

    render: function() {
      var compiled = _.template(index);

      $(this.el).html(compiled({ collection : App.view_overrides }));
      $('#nav').html(this.el);

      new App.Views.ViewOverrides.List({ collection: App.view_overrides});

      $('iframe').height($(window).height() - 50);
    },

    zoom_in: function() {
      frames[0].hook_zoom('in');
      return false;
    },

    zoom_out: function() {
      frames[0].hook_zoom('out');
      return false;
    },

    navigate: function() {
      new App.Views.Shared.navigate();
      return false;
    }


});

