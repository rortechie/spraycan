Spraycan.Views.Shared.GroupIndex = Backbone.View.extend({
  events: {
   "click a.box": "show_selected"
  },

  initialize: function(opts) {
    this.display_name = opts['display_name'];

    $(this.el).data('view', this);
    this.themes = _.select(Spraycan.themes.models, function(model){
      return model.get('applies_to') == opts['group'];
    });

    this.render();
  },

  render: function() {
    var compiled = JST["spraycan/templates/shared/group_index"];

    $(this.el).html(compiled({display_name: this.display_name, themes: this.themes}));
    $('#colors-container').html('');
    $('#design-container').html(this.el);
    $('#fonts-container').html('');
    $('#images-container').html('');
  },

  show_selected: function(sel){
    $('a.box').removeClass('selected');
    (sel.currentTarget).addClass('selected');
  }
});
