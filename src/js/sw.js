var cacheVersion = "v1",
	cachedAssets = [
		"/css/global.css?v=ae67ea6a98142f2099a5ff09bf560e9c",
		"/css/fonts-loaded.css?v=a310f8f662144ebf0ca03184e8491a73",
		"/js/debounce.js?v=28c9623064eb63d6bd27d5574fdfd477",
		"/js/lazyload.js?v=764f950dec4b60a4ff433298210dfdb8",
		"/js/nav.js?v=f0a94b5e652c6d74b7b3fc4bd112c532",
		"/js/attach-nav.js?v=5df376eaac591f93c7ce65fccd77d4c4",
		"/js/load-fonts.js?v=312d84cb54d600d7e2506c4b8cdd123d",
		"/img/global/jeremy.svg",
		"/img/global/icon-github.svg",
		"/img/global/icon-email.svg",
		"/img/global/icon-twitter.svg",
		"/img/global/icon-linked-in.svg"
	];

self.addEventListener("install", function(event){
	event.waitUntil(caches.open(cacheVersion).then(function(cache){
		return cache.addAll(cachedAssets);
	}).then(function(){
		return self.skipWaiting();
	}));
});

self.addEventListener("fetch", function(event){
	var whitelist = /(jeremywagner.me|fonts\.googleapis\.com|fonts\.gstatic\.com)/i,
		blacklist = /(sw\.js|sw-install\.js|ga\.js|google-analytics\.com|youtube\.com|ytimg\.com|twitter\.com|doubleclick\.net|twimg\.com)/i,
		htmlDocument = /(\/|\.html)$/i;

	if(whitelist.test(event.request.url) === true && blacklist.test(event.request.url) === false){
		if(htmlDocument.test(event.request.url) === true){
			event.respondWith(
				fetch(event.request).then(function(response){
					caches.open(cacheVersion).then(function(cache){
						cache.put(event.request, response);
					});

					return response.clone();
				}).catch(function(){
					return caches.match(event.request);
				})
			);
		}
		else{
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
	}
});

self.addEventListener("activate", function(event){
	var cacheWhitelist = ["v1"];

	event.waitUntil(
		caches.keys().then(function(keyList){
			return Promise.all([
				keyList.map(function(key){
					if(cacheWhitelist.indexOf(key) === -1){
						return caches.delete(key);
					}
				}), self.clients.claim()
			]);
		})
	);
});