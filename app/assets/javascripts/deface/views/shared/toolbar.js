var toolbar = (<r><![CDATA[
  <ul class="buttons small toggle">
    <li class="first <%= (Deface.editor.maximised || Deface.editor.visible) ? '' : 'disabled' %>" id="min">
      <a rel="min" href="#">_</a>
    </li>
    <li class="<%= Deface.editor.maximised ? '' : 'disabled' %>" id="restore">
      <a rel="restore" href="#">-</a>
    </li>
    <li class="last <%= (!Deface.editor.maximised && Deface.editor.visible) ? '' : 'disabled' %>" id="max">
      <a rel="max" href="#">&oline;</a>
    </li>
  </ul>

  <ul class="buttons small toggle">
    <li class="first"><a rel="zoom-in" href="#">+</a></li>
    <li class="big"><a rel="toggle" href="#">Toggle</a></li>
    <li class="last"><a rel="zoom-out" href="#">-</a></li>
  </ul>

  <ul class="buttons toggle">
    <li class="first"><a rel="navigate" href="#">Go</a></li>
    <li class="last"><a rel="refresh" href="#">Refresh</a></li>
  </ul>

  <div id="loadables">
  </div>

  <ul id="current" class="buttons toggle">
    <li id='html' class="first <%= Deface.current == 'html' ? 'active' : '' %>"><a rel="html" href="/deface#html">HTML</a></li>
    <li id='css' class="<%= Deface.current == 'css' ? 'active' : '' %>"><a rel="css" href="/deface#stylesheet/application">CSS</a></li>
    <li id='files' class="last <%= Deface.current == 'files' ? 'active' : '' %>"><a rel="files" href="/deface#files">Files</a></li>
  </ul>

  <a href="/deface#themes" id="theme_name"><%= Deface.theme_name %></a>]]></r>).toString();

Deface.Views.Shared.Toolbar = Backbone.View.extend({
  events: {
    "click a[rel='navigate']": "navigate",
    "click a[rel='min']": "minimise",
    "click a[rel='restore']": "restore",
    "click a[rel='max']": "maximise",
    "click a[rel='zoom-in']": "zoom_in",
    "click a[rel='zoom-out']": "zoom_out",
    "click a[rel='toggle']": "toggle",
    "click a[rel='refresh']": "refresh"
  },

  initialize: function() {
    this.render();
  },

  minimise: function() {
    if(Deface.editor.visible){
      Deface.editor.maximised = false;
      Deface.editor.minimised = true;
      Deface.animate_resize();
    }
    return false;
  },

  restore: function() {
    if(Deface.editor.visible){
      Deface.editor.maximised = false;
      Deface.editor.minimised = false;
      Deface.animate_resize();
    }

    return false;
  },

  maximise: function() {
    if(Deface.editor.visible){
      Deface.editor.maximised = true;
      Deface.editor.minimised = false;
      Deface.animate_resize();
    }

    return false;
  },

  render: function() {
    var compiled = _.template(toolbar);

    $(this.el).html(compiled({ collection : Deface.view_overrides }));
    $('#nav').html(this.el);

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

  toggle: function() {
    frames[0].show_frames = !frames[0].show_frames;
    frames[0].show_hook_frames();
    return false;
  },

  refresh: function() {
    frames[0].location.href = frames[0].location.href;
    return false;
  },

  navigate: function() {
    new Deface.Views.Shared.navigate();
    return false;
  }

});
