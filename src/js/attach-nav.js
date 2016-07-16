(function(window, document, debounce){
	var navElement = document.getElementsByTagName("nav")[0],
		containerElement = document.getElementById("nav-container"),
		stickyClass = "fixed",
		pinNav = debounce(function(){
		var scrollTop = window.scrollY || document.body.scrollTop || window.pageYOffset,
			bodyRect = document.body.getBoundingClientRect(),
			elemRect = navElement.getBoundingClientRect(),
			offset = (elemRect.top - bodyRect.top) - 20;

		if(scrollTop >= offset){
			containerElement.classList.add(stickyClass);
		}
		else if(scrollTop < offset){
			containerElement.classList.remove(stickyClass);
		}
	}, 10);

	document.addEventListener("DOMContentLoaded", pinNav);
	document.addEventListener("scroll", pinNav);
	document.addEventListener("touchmove", pinNav);
	document.addEventListener("resize", pinNav);
	window.onorientationchange = pinNav;
})(window, document, debounce);