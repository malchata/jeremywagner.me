(function(window, document){
	"use strict";

	document.onreadystatechange = function(){
		var navIcon = document.getElementById("nav-icon"),
			closeIcon = document.getElementById("close-nav"),
			nav = document.getElementsByTagName("nav")[0],
			pageFade = document.getElementById("page-fade");

		navIcon.addEventListener("click", openNav);
		closeIcon.addEventListener("click", closeNav);
		pageFade.addEventListener("click", closeNav);

		function openNav(){
			nav.className = "open";
			pageFade.className = " show";
		}

		function closeNav(){
			nav.className = "";
			pageFade.className = "";
		}
	};
})(window, document);