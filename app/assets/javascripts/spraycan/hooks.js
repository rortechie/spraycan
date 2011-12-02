var $jQ = jQuery.noConflict(true);

//set hook frame positions
var show_frames = false;
var frame_level = 0;

function show_hook_frames(){
  if(show_frames){
    $jQ.each($("[data-hook]"), function(i, hook){
      var hooks = $jQ(hook).parents().filter(function(i,p) { return $jQ(p).attr("data-hook")!=undefined });
      if(hooks.length == frame_level){
        var hook = $jQ(hook);
        if(hook.attr('id')!="" || hook.attr('data-hook')!=""){
          hook.attr('data-layer', frame_level);

          hook.addClass('spraycan_hook_frame');
        }
      }
    });
  }else{
    $jQ('.spraycan_hook_frame').removeClass('spraycan_hook_frame');

  }
}

function find_hook_frame(event){
  var target = $jQ(this);

  if(target.hasClass('spraycan_hook_frame')){
    show_hook_details(target);
  }else{
    parents = target.parents('.spraycan_hook_frame');

    if(parents.length>0){
      show_hook_details($jQ(parents[0]));
    }

  }
}

function show_hook_details(target){
  var hook_name = target.attr('data-hook');

  if(hook_name==""){
    hook_name = target.attr('id');
  }

  top.location.href = "/spraycan#inspect/" + hook_name;
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
    $jQ('.spraycan_hook_frame').removeClass('spraycan_hook_frame');

    show_hook_frames();

    //check we haven't zoomed to far in or out, 
    //undo if we did
    if($jQ('.spraycan_hook_frame').length==0){
      frame_level = current_level;

      show_hook_frames();
    }
  }
}

$jQ(function() {
  if(top.Spraycan!=undefined){
    top.Spraycan.iframe_busy(false);

    $jQ('*').bind('mouseenter', find_hook_frame);
    show_hook_frames();
  }
});

//show activity while iframe is loading
window.onbeforeunload = function() {
  if(top.Spraycan!=undefined){
    top.Spraycan.iframe_busy(true);
  }
}

