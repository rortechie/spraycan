//set hook frame positions
var show_frames = true;
var frame_level = 1;
var current_hooks = new Array;

function show_hook_frames(){
  $jQ.each($jQ("[data-layer='" + frame_level + "']"), function(i, hook){
    var hook = $jQ(hook);
    var layer = hook.attr('data-layer');

    hook.addClass('deface_hook_frame');
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
        show_hook_frames();
      }
    }
  }
}

function create_tip(e){
  var hook = $jQ(e.currentTarget);
  var layer = hook.attr('data-layer');

  if(frame_level==layer){

    if(hook.data('qtip')==undefined){
      hook_name = hook.attr('data-hook');

      hook.qtip({
        content: '<h4>' + hook_name+'</h4><a href="/deface#view_overrides/edit/' + hook_name + '" target="_top">Edit</a> | <a href="/deface#view_overrides/new/' + hook_name + '" target="_top">New</a>',
        show: { ready: true, solo: true, delay: 0, effect: { type: 'none', length: 0 } },
        hide: { fixed: true, when: { event: 'unfocus' }, delay: 2000, effect: { type: 'none', length: 0 } },
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
        }

      });
    }else{
       hook.qtip("enable");
    }

    hook.qtip("show");
    hook.qtip("focus");
  }

}

function kill_tip(e){
  var hook = $jQ(e.currentTarget);

  if(hook.data('qtip')!=undefined){
     //hook.qtip("hide");
     //hook.qtip("disable");
  }
}

$jQ(function() {
  if(top.App!=undefined){
    show_hook_frames();

    $('[data-hook]').mousemove(create_tip).mouseleave(kill_tip);

  }
});

