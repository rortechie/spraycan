Spraycan.Routers.Selector = Backbone.Router.extend({
  routes: {
 
    "fonts": "fonts",
    "images": "images",
    "theme?apply=:cid": "apply_theme",
    "cancel_dialog": "cancel_dialog",
  },


  // design: function(){
  //   Spraycan.set_current('design', 'index');
  //   var compiled = JST["spraycan/templates/navigation/design"];
  //   $('#colors-container').html('');
  //   $('#design-container').html(compiled());
  //   $('#fonts-container').html('');
  //   $('#images-container').html('');
  // },

  // design_layouts: function(){
  //   Spraycan.set_current('design', 'layouts');
  //   new Spraycan.Views.Shared.GroupIndex({display_name: 'Layouts', group: 'layouts'});
  // },

  // design_products_listing: function(){
  //   Spraycan.set_current('design', 'product_listing');
  //   new Spraycan.Views.Shared.GroupIndex({display_name: 'Product Listing', group: 'product_listing'});
  // },

  // design_products_details: function(){
  //   Spraycan.set_current('design', 'product_details');
  //   new Spraycan.Views.Shared.GroupIndex({display_name: 'Product Details', group: 'product_details'});
  // },

  fonts: function(){
    Spraycan.set_current('fonts', 'edit');
    new Spraycan.Views.Fonts.Edit();
  },

  images: function(){
    Spraycan.set_current('files', 'edit');
    new Spraycan.Views.Files.Edit();
  },

  apply_theme: function(cid){
    var theme = Spraycan.themes.getByCid(cid);
    theme.save({active: true}, {
      success: function(model, resp) {
        Spraycan.reload_frame();
        Spraycan.reset_url();
      },
      error: Spraycan.handle_save_error
    });
  },

  cancel_dialog: function() {
    window.location.href ="#";
    $('.modal').hide();
  },

});

