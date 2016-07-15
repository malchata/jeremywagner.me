var version = "v1::";

self.addEventListener("install", function(e){
	caches.open(version + "basics").then(function(cache){
		return cache.addAll([
			"/index.html",
			"/css/globalcss",
			"/js/attach-nav.js",
			"/js/debounce.js",
			"/js/lazyload.js",
			"/js/nav.js"
		]);
	});
});