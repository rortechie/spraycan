//set hook frame positions
var show_frames = true;
var frame_level = 0;

function show_hook_frames(){
  if(show_frames){
    $jQ.each($("[data-hook]"), function(i, hook){
      var hooks = $jQ(hook).parents().filter(function(i,p) { return $jQ(p).attr("data-hook")!=undefined });
      if(hooks.length == frame_level){
        var hook = $jQ(hook);
        var layer = hook.attr('data-layer');

        hook.addClass('deface_hook_frame');
      }
    });
  }else{
    $jQ('.deface_hook_frame').removeClass('deface_hook_frame');
  }
}

function hook_zoom(in_or_out){
  show_frames = true;
  var current_level = frame_level;

  if(in_or_out=="in"){
    frame_level = current_level + 1;
  }else{
    frame_level = current_level - 1;
  }

  if(frame_level!=current_level){
    $jQ('.deface_hook_frame').removeClass('deface_hook_frame');

    show_hook_frames();

    //check we haven't zoomed to far in or out, 
    //undo if we did
    if($jQ('.deface_hook_frame').length==0){
      frame_level = current_level;

      show_hook_frames();
    }
  }
}

function create_tip(e){
  var hook = $jQ(e.currentTarget);
  var layer = hook.parents().filter(function(i,p) { return $jQ(p).attr("data-hook")!=undefined }).length;

  if(frame_level==layer && show_frames){

    if(hook.data('qtip')==undefined){
      var hook_name = hook.attr('data-hook');
      if(hook_name==""){
        hook_name = hook.attr('id');
      }

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
  if(top.Deface!=undefined){
    top.Deface.decrement_activity();

    show_hook_frames();

    //set handlers for tooltips
    $('[data-hook]').mousemove(create_tip).mouseleave(kill_tip);

  }
});

//show activity while iframe is loading
window.onbeforeunload = function() {
  if(top.Deface!=undefined){
    top.Deface.increment_activity();
  }
}

