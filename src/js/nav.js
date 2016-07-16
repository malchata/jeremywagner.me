(function(window, document){
	document.addEventListener("DOMContentLoaded", function(){
		navIcon = document.getElementById("nav-icon");
		closeIcon = document.getElementById("close-nav");
		nav = document.getElementsByTagName("nav")[0];
		pageFade = document.getElementById("page-fade");

		navIcon.addEventListener("click", openNav);
		closeIcon.addEventListener("click", closeNav);
		pageFade.addEventListener("click", closeNav);

		function openNav(){
			nav.classList.add("open");
			pageFade.classList.add("show");
		}

		function closeNav(){
			nav.classList.remove("open");
			pageFade.classList.remove("show");
		}
	});
})(window, document);