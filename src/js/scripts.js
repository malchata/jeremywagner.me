"use strict";var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=function(e,t){if("IMG"===e.tagName){var o=e.parentNode;if("PICTURE"===o.tagName)for(var r in[].slice.call(o.querySelectorAll("source")).forEach(function(e){for(var t in e.dataset)e.setAttribute(t,e.dataset[t]),e.removeAttribute("data-"+t)}),e.dataset)e.setAttribute(r,e.dataset[r]),e.removeAttribute("data-"+r);else{var n=new Image;if(void 0!==e.dataset.srcset&&(n.srcset=e.dataset.srcset),n.src=e.dataset.src,!0===t.asyncDecodeSupport)n.decode().then(function(){n.alt=e.alt,n.width=e.width,n.height=e.height,e.replaceWith(n)});else for(var i in e.dataset)e.setAttribute(i,e.dataset[i]),e.removeAttribute("data-"+i)}}"VIDEO"===e.tagName&&([].slice.call(e.querySelectorAll("source")).forEach(function(e){for(var t in e.dataset)e.setAttribute(t,e.dataset[t]),e.removeAttribute("data-"+t)}),e.load()),"IFRAME"===e.tagName&&(e.src=e.dataset.src,e.removeAttribute("data-src"))},yall=function(e){var r={intersectionObserverSupport:"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype,mutationObserverSupport:"MutationObserver"in window,idleCallbackSupport:"requestIdleCallback"in window,asyncDecodeSupport:"decode"in new Image,eventsToBind:[[document,"scroll"],[document,"touchmove"],[window,"resize"],[window,"orientationchange"]]},t={lazyClass:"lazy",throttleTime:200,idlyLoad:!1,idleLoadTimeout:100,threshold:200,observeChanges:!1,observeRootSelector:"body",mutationObserverOptions:{childList:!0}};t.intersectionObserverOptions={rootMargin:t.threshold+"px 0%"};var n="object"===(void 0===e?"undefined":u(e))?l(t,e):t,o="img."+n.lazyClass+",video."+n.lazyClass+",iframe."+n.lazyClass,i={timeout:n.idleLoadTimeout},a=[].slice.call(document.querySelectorAll(o));if(!0===r.intersectionObserverSupport){var s=new IntersectionObserver(function(e,o){e.forEach(function(e){var t=e.target;!0===e.isIntersecting&&(!0===n.idlyLoad&&!0===r.idleCallbackSupport?requestIdleCallback(function(){d(t,r)},i):d(t,r),t.classList.remove(n.lazyClass),o.unobserve(t),a=a.filter(function(e){return e!==t}))})},n.intersectionObserverOptions);a.forEach(function(e){return s.observe(e)})}else{var c=function yallBack(){var e=!1;!1===e&&0<a.length&&(e=!0,setTimeout(function(){a.forEach(function(t){t.getBoundingClientRect().top<=window.innerHeight+n.threshold&&t.getBoundingClientRect().bottom>=-n.threshold&&"none"!==getComputedStyle(t).display&&(!0===n.idlyLoad&&!0===r.idleCallbackSupport?requestIdleCallback(function(){d(t,r)},i):d(t,r),t.classList.remove(n.lazyClass),a=a.filter(function(e){return e!==t}))}),e=!1,0===a.length&&!1===n.observeChanges&&r.eventsToBind.forEach(function(e){return e[0].removeEventListener(e[1],yallBack)})},n.throttleTime))};r.eventsToBind.forEach(function(e){return e[0].addEventListener(e[1],c)})}!0===r.mutationObserverSupport&&!0===n.observeChanges&&new MutationObserver(function(e){e.forEach(function(e){[].slice.call(document.querySelectorAll(o)).forEach(function(e){-1===a.indexOf(e)&&(a.push(e),!0===r.intersectionObserverSupport?s.observe(e):c())})})}).observe("body"===n.observeRootSelector?document.body:document.querySelector(n.observeRootSelector),n.mutationObserverOptions)};

if("matchMedia" in window && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype){
	document.addEventListener("DOMContentLoaded", ()=>{
		yall();

		let navElement = document.getElementsByTagName("nav")[0];
		let navContainerElement = document.getElementsByClassName("nav-container")[0];
		let navSentinelElement = document.getElementsByClassName("nav-sentinel")[0];

		let navObserver = new IntersectionObserver((entries, observer)=>{
			entries.forEach((entry)=>{
				if(matchMedia("(min-width: 50rem)").matches === true && entry.intersectionRatio < 1){
					entry.target.classList.add("sticky-nav");
				}
			});
		}, {
			threshold: buildThresholdList(100),
			rootMargin: "0px 0px 1000% 0px"
		});

		let navSentinelObserver = new IntersectionObserver((entries, observer)=>{
			entries.forEach((entry)=>{
				if(matchMedia("(min-width: 50rem)").matches === false || entry.isIntersecting === true){
					navContainerElement.classList.remove("sticky-nav");
				}
			});
		}, {
			threshold: buildThresholdList(100),
			rootMargin: "0px 0px 1000% 0px"
		});

		navSentinelObserver.observe(navSentinelElement);
		navObserver.observe(navContainerElement);
	});

	function buildThresholdList(numSteps){
		let thresholds = [];

		for(let i=1.0; i <= numSteps; i++){
			let ratio = i / numSteps;
			thresholds.push(ratio);
		}

		thresholds.push(0);
		return thresholds;
	}
}
