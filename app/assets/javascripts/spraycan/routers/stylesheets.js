Spraycan.Routers.Stylesheets = Spraycan.Routers.Base.extend({
  klass: 'stylesheets',

  routes: {
    "stylesheet?all": "all",
    "stylesheet/:cid": "edit",
    "stylesheet?new": "new_record",
    "stylesheet?delete=:cid&confirm=:confirm": "delete_record"
  }

});
