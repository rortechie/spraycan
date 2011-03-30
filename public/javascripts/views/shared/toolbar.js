var toolbar = (<r><![CDATA[
  <ul class="buttons small toggle">
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
    <li id='html' class="first <%= App.current == 'html' ? 'active' : '' %>"><a rel="html" href="/deface#html">HTML</a></li>
    <li id='css' class="last <%= App.current == 'css' ? 'active' : '' %>"><a rel="css" href="/deface#stylesheet/application">CSS</a></li>
  </ul> ]]></r>).toString();

App.Views.Shared.Toolbar = Backbone.View.extend({
  events: {
    "click a[rel='navigate']": "navigate",
    "click a[rel='min']": "minimise",
    "click a[rel='restore']": "restore",
    "click a[rel='max']": "maximise",
    "click a[rel='zoom-in']": "zoom_in",
    "click a[rel='zoom-out']": "zoom_out",
    "click a[rel='toggle']": "toggle",
    "click a[rel='refresh']": "refresh",
    "click a[rel='load']": "show_load"
  },

  initialize: function() {
    this.render();
  },

  minimise: function() {
    if(App.editor.visible){
      App.editor.maximised = false;
      App.editor.minimised = true;
      App.animate_resize();
    }
    return false;
  },

  restore: function() {
    if(App.editor.visible){
      App.editor.maximised = false;
      App.editor.minimised = false;
      App.animate_resize();
    }

    return false;
  },

  maximise: function() {
    if(App.editor.visible){
      App.editor.maximised = true;
      App.editor.minimised = false;
      App.animate_resize();
    }

    return false;
  },

  render: function() {
    var compiled = _.template(toolbar);

    $(this.el).html(compiled({ collection : App.view_overrides }));
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
    new App.Views.Shared.navigate();
    return false;
  }

});
