Spraycan.Routers.Files = Spraycan.Routers.Base.extend({
  klass: 'files',

  routes: {
    "file?all": "all",
    "file/:cid": "edit",
    "file?new": "new_record",
    "file?delete=:cid&confirm=:confirm": "delete_record"
  }

});
