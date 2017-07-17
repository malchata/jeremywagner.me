(function(window, document){
	window.addEventListener("onload", function(){
		bodyElement = document.getElementsByTagName("body")[0];
		navIcon = document.getElementById("nav-icon");
		navTrigger = document.getElementById("nav-trigger");
		nav = document.getElementsByTagName("nav")[0];
		pageFade = document.getElementById("page-fade");

		navTrigger.addEventListener("click", toggleNav);
		pageFade.addEventListener("click", closeNav);

		function toggleNav(){
			if(navIcon.classList.contains("opened") === false){
				navIcon.classList.add("opened");
				nav.classList.add("open");
				pageFade.classList.add("show");
				bodyElement.style.overflowY = "hidden";
				window.scrollTo(0, 0);
			}
			else{
				closeNav();
			}
		}

		function closeNav(){
			navIcon.classList.remove("opened");
			nav.classList.remove("open");
			pageFade.classList.remove("show");
			bodyElement.style.overflowY = "visible";
		}
	}, false);
})(window, document);
