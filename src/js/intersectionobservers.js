if("matchMedia" in window && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype){
	document.addEventListener("DOMContentLoaded", ()=>{
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
