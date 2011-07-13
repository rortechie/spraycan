$(function() {
    Deface.init(); //start backbone
    require.aceBaseUrl = "/assets/deface/ace/"; //so ACE can find worker files
});

//helper to serialize entire form
$.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

//modal dialog for confirming delete
$.fn.add_confirm_delete = function(){
  this.qtip({
    content: {
        text: function(api) {
          var temp = JST["deface/templates/shared/confirm_delete"];
          return temp({ klass: Deface.view.model.klass(), id: Deface.view.model.get('id')});
        },
        title: { text: 'Confirm Delete', button: true }
    },
    position: { my: 'center', at: 'center', target: $("div#deface_editor") },
    show: { event: 'click', solo: true, modal: true },
    hide: false,
    style: 'ui-tooltip-light ui-tooltip-rounded'
  });
};

//modal dialog for general message
$.fn.show_message = function(title, message){
  $('.qtip.ui-tooltip').qtip('hide');

  this.qtip({
    content: {
        text: function(api) {
          var temp = JST["deface/templates/shared/message_content"];
          return temp({ message: message});
        },
        title: { text: title, button: true }
    },
    position: { my: 'center', at: 'center', target: $("div#deface_editor") },
    show: { ready: true, solo: true, modal: true },
    hide: false,
    style: 'ui-tooltip-light ui-tooltip-rounded'
  });

  this.data('qtip').show();
}
