var cacheVersion = "v1",
	cachedAssets = [
		"/css/global.css?v=ae67ea6a98142f2099a5ff09bf560e9c",
		"/css/fonts-loaded.css?v=a310f8f662144ebf0ca03184e8491a73",
		"/js/debounce.js?v=28c9623064eb63d6bd27d5574fdfd477",
		"/js/lazyload.js?v=a101580ce2a51785b1f144a65efd9839",
		"/js/nav.js?v=f0a94b5e652c6d74b7b3fc4bd112c532",
		"/js/attach-nav.js?v=cfe62eee02759856ea9d5cf74c1cb8fd",
		"/js/load-fonts.js?v=476e5c68b7c414d15ca53e69a199b5f8",
		"/img/global/jeremy.svg",
		"/img/global/icon-github.svg",
		"/img/global/icon-email.svg",
		"/img/global/icon-twitter.svg",
		"/img/global/icon-linked-in.svg"
	];

self.addEventListener("install", function(event){
	event.waitUntil(caches.open(cacheVersion).then(function(cache){
		return cache.addAll(cachedAssets);
	}));
});

self.addEventListener("fetch", function(event){
	var allowedHosts = /(dev\.jeremywagner\.me|jeremywagner\.me|fonts\.googleapis\.com|fonts\.gstatic\.com)/i,
		blacklist = /(ga.js)/i;

	if(allowedHosts.test(event.request.url) === true && blacklist.test(event.request.url) === false){
		event.respondWith(
			caches.match(event.request).then(function(cachedResponse){
				return cachedResponse || fetch(event.request).then(function(fetchedResponse){
					caches.open(cacheVersion).then(function(cache){
						cache.put(event.request, fetchedResponse);
					});

					return fetchedResponse.clone();
				});
			})
		);
	}
});