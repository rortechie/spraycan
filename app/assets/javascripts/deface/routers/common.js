Deface.Routers.Common = Backbone.Router.extend({
  routes: {
    "hide_qtips": "hide_qtips"
  },

  hide_qtips: function(id) {
    $('.qtip.ui-tooltip').qtip('hide');
  }

});
