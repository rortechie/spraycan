Spraycan.Routers.ViewOverrides = Spraycan.Routers.Base.extend({
  klass: 'view_overrides',

  routes: {
    "view_override?all": "all",
    "view_override/:cid": "edit",
    "view_override?new=:hook": "new_record",
    "view_override?delete=:cid&confirm=:confirm": "delete_record"
  },

  //override as we need custom junk in model
  new_record: function(hook) {
    var model = new top[this.klass.singularize().camelize()]({ hook: hook, selector: "[data-hook='" + hook + "'], #" + hook + "[data-hook]"})
    model.set({ name: 'new_' + model.cid });

    Spraycan[this.klass].add(model);

    eval("new Spraycan.Views." + this.klass.camelize() + ".Edit({ model: model })");

    Spraycan.set_current(this.klass, 'edit', model);

    window.location.href ="#";
    return false;
  },


});
