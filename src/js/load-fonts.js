(function(document){
	if(document.fonts){
		//document.fonts.load("1em Tinos");
		document.fonts.load("1em Montserrat");

		document.fonts.ready.then(function(fontFaceSet){
			document.documentElement.classList.add("fonts-loaded");
			document.cookie = "fonts-loaded=";
		});
	}
	else if(!document.fonts && document.cookie.indexOf("fonts-loaded") === -1){
		var fontFaceObserverScript = document.createElement("script");

		fontFaceObserverScript.src = "/js/fontfaceobserver.js";
		fontFaceObserverScript.defer = "defer";
		fontFaceObserverScript.async = "async";

		document.head.appendChild(fontFaceObserverScript);
	}
})(document);