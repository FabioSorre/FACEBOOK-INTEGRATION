


shadow_box_close = function() {
 // remove the zoom in case it is active
 $('#sb-nav-magnify').remove();
 $('#sb-nav-resize').remove();
 $('.loupe').remove();
}

shadow_box_change = function(gallery_element) {
 // this handles draggable images when the user clicks next
 if (gallery_element.options.handleOversize != 'drag') {
  var sb_nav_resize = $('#sb-nav-resize');
  if (sb_nav_resize.hasClass('sb-nav-resize-off')) {
   sb_nav_resize.addClass('sb-nav-resize-on').removeClass('sb-nav-resize-off');
   shadow_box_draw_magnify_icon();
  }
 }
 // switch off the zoom when changing photo
 if ($('#sb-nav-magnify').length > 0) {
  var sb_nav_magnify = $('#sb-nav-magnify');
  if (sb_nav_magnify.hasClass('sb-nav-magnify-on')) {
   sb_nav_magnify.addClass('sb-nav-magnify-off').removeClass('sb-nav-magnify-on');
   $('.loupe').hide(); 
  }
 }
 // remove zoom and resize if loading element is not an image
 if (gallery_element.player != "img") {
  $('#sb-nav-magnify').remove();
  $('#sb-nav-resize').remove();
 }
 $('.loupe').remove();
};

shadow_box_open = function(gallery_element) {
 // make sure it's an image, no magnifier needed for videos
 if (gallery_element.player == "img") {
  // check to make sure the magnifier isn't already there
  shadow_box_draw_resize_icon();
  shadow_box_draw_magnify_icon();
  // enable magnifier when image is clicked
  $('#sb-player').click(function(e) { shadow_box_magnify_click_action(this, e); });
 }
};

shadow_box_draw_resize_icon = function() {
 if ($('#sb-nav-resize').length == 0) {
  $('<a />').attr('id','sb-nav-resize').attr('class','sb-nav-resize-on').attr('title','Resize').attr('onClick','shadow_box_resize_toggle()').appendTo('#sb-nav');
 }
};

shadow_box_draw_magnify_icon = function() {
 var sb_nav_resize = $('#sb-nav-resize');
 if ($('#sb-nav-magnify').length == 0) {
  if (sb_nav_resize.hasClass('sb-nav-resize-on')) {
   // add the magnifier icon
   $('<a />').attr('id','sb-nav-magnify').attr('class','sb-nav-magnify-off').attr('title','Magnify').attr('onClick','shadow_box_magnify_toggle()').appendTo('#sb-nav');
  }
 }
};

shadow_box_magnify_click_action = function(theob, e) {
 // these are used for clicks on images
 shadow_box_magnify_toggle();
 // click event is different to mouseenter, so required data is converted
 // failure to do this results in a random layer at the bottom of screen
 // anyway, fire update
 var newE = jQuery.Event('mouseenter');
 newE.pageX = e.pageX;
 newE.pageY = e.pageY;
 $(theob).trigger(newE);
};

shadow_box_magnify_toggle = function() {
 var sb_nav_magnify = $('#sb-nav-magnify');
 if (sb_nav_magnify.hasClass('sb-nav-magnify-on')) {
  sb_nav_magnify.addClass('sb-nav-magnify-off').removeClass('sb-nav-magnify-on');
  // hide the magnifier otherwise it will stay there until the mouse moves 
  $('.loupe').hide();
 } else {
  if (!$('.loupe').length) {
   $('#sb-player').loupe({ width: 250, height: 200 });
   // watch for a click on the magnifier which means close
   $('.loupe').click(function(e) { shadow_box_magnify_click_action(this, e); });
  }
  sb_nav_magnify.addClass('sb-nav-magnify-on').removeClass('sb-nav-magnify-off');
 }
};

shadow_box_resize_toggle = function() {
 var gc = Shadowbox.gallery[Shadowbox.current];
 gc.options = gc.options || {};
   
 var sb_nav_resize = $('#sb-nav-resize');
 var sb_nav_magnify = $('#sb-nav-magnify');
  
 if (sb_nav_resize.hasClass('sb-nav-resize-on')) {
  sb_nav_resize.addClass('sb-nav-resize-off').removeClass('sb-nav-resize-on');
  $('#sb-nav-magnify').remove();
  gc.options.handleOversize = 'drag';
 } else {
  sb_nav_resize.addClass('sb-nav-resize-on').removeClass('sb-nav-resize-off');
  gc.options.handleOversize = 'resize';
  shadow_box_draw_magnify_icon();
 }
 
 Shadowbox.change(Shadowbox.current);
 gc.options.handleOversize = 'resize';
};
