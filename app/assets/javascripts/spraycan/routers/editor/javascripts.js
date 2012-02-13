Spraycan.Routers.Javascripts = Spraycan.Routers.Base.extend({
  klass: 'javascripts',

  routes: {
    "javascript?all": "all",
    "javascript/:cid": "edit",
    "javascript?new": "new_record",
    "javascript?delete=:cid&confirm=:confirm": "delete_record"
  },

});
