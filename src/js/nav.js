(function(window, document){
	document.addEventListener("DOMContentLoaded", function(){
		navIcon = document.getElementById("nav-icon");
		closeIcon = document.getElementById("close-nav");
		nav = document.getElementsByTagName("nav")[0];
		pageFade = document.getElementById("page-fade");
		threshold = 640;

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
	});
})(window, document);