(function(window, document, debounce){
	var navElement = document.getElementsByTagName("nav")[0],
		containerElement = document.getElementsByClassName("nav-container")[0],
		pinNav = debounce(function(){
		var scrollTop = window.scrollY || document.body.scrollTop || window.pageYOffset,
			bodyRect = document.body.getBoundingClientRect(),
			elemRect = navElement.getBoundingClientRect(),
			offset = (elemRect.top - bodyRect.top) - 20;

		if(scrollTop >= offset){
			containerElement.className += "nav-container fixed";
		}
		else if(scrollTop < offset){
			containerElement.className = "nav-container";
		}
	}, 10);

	document.onreadystatechange = pinNav;
	window.addEventListener("scroll", pinNav);
	window.addEventListener("touchmove", pinNav);
	window.addEventListener("resize", pinNav);
	window.onorientationchange = pinNav;
})(window, document, debounce);