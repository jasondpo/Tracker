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
		$("h17").fadeIn("slow").delay(1000).fadeOut("slow", function(){
			$(".intro-logo").fadeIn().addClass("animated bounceInDown").one(animationEnd, function(){
				$(".intro-logo-text").fadeIn().addClass("animated bounceInLeft").one(animationEnd, function(){
				$(".intro-pinkOverlay").delay(1000).fadeOut("slow")
					});		
			});		
		})
	}, 500)
})