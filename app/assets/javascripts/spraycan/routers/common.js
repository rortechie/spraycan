Spraycan.Routers.Common = Backbone.Router.extend({
  routes: {
    "cancel_dialog": "cancel_dialog"
  },

  cancel_dialog: function() {
    window.location.href ="#";
    $('.modal.in').modal('hide');
  }

});
