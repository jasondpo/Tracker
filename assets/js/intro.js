var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));


$(function(){
	setTimeout(function(){
		$("h17").fadeIn("slow").delay(1000).fadeOut("slow").delay(500).queue(function(){
			$(".intro-logo").delay(500).addClass("intro-logo-animate").delay(500).queue(function(){
				$(".intro-logo-text").fadeIn("fast").delay(1500).queue(function(){
					$(".intro-pinkOverlay").fadeOut("slow");
				});
			});
		});	
	}, 500);
})