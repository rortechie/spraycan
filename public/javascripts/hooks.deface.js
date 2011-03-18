//set hook frame positions
var show_frames = true;
var frame_level = 1;
var current_hooks = new Array;

function resize_hook_frames(){
  $jQ.each($jQ("[data-layer='" + frame_level + "']"), function(i, hook){
    var hook = $jQ(hook);
    var layer = hook.attr('data-layer');

    if(frame_level==layer){
      hook.addClass('deface_hook_frame');

      if(hook.data('qtip')==undefined){
        hook_name = hook.attr('data-hook')
        hook.qtip({
          content: '<h4>' + hook_name+'</h4><a href="/deface#view_overrides/edit/' + hook_name + '" target="_top">Edit</a> | <a href="/deface#view_overrides/new/' + hook_name + '" target="_top">New</a>',
          show: { solo: true },
          hide: { when: { event: 'unfocus' }, delay: 2000 },
          position: {
            adjust: { screen: true },
            corner: { tooltip: 'bottomMiddle', target: 'topMiddle' }
          },
          style: { border: { width: 4, radius: 6 },
                   padding: 6,
                   textAlign: 'center',
                   tip: true,
                   name: 'dark',
                   classes: { tooltip: 'deface-qtip' }
          },
          api: {
            beforeShow: function(){
              if(frame_level +'' == $(this.elements.target).attr('data-layer')){
                return true
              }else{
                return false
              }
            },

            onRender:function() {
              //handlers for bubbles
            }
          }

        });
      }else{
        hook.qtip("enable");
      }

      current_hooks[current_hooks.length] = hook;
    }

  });


}

function hook_zoom(in_or_out){
  var current_level = frame_level;

  if(in_or_out=="in"){
    num = current_level + 1;
  }else{
    num = current_level - 1;
  }

  if(num>0 && num<10){
    var count = $("[data-layer='" + num + "']").length;
  }

  if(count>0){
    frame_level = num;
    if(frame_level!=current_level){

      $jQ.each(current_hooks, function(i, hook) {
        hook.qtip('disable');
      });
      current_hooks = new Array;

      $jQ('.deface_hook_frame').removeClass('deface_hook_frame');

      if(show_frames){
        resize_hook_frames();
      }
    }
  }
}

$jQ(function() {
  if(top.App!=undefined){
    //set initial placement for hook frames
    resize_hook_frames();

    $jQ(window).resize(function() {
      resize_hook_frames();
    });
  }
});

