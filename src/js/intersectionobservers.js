if("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype){
	document.addEventListener("DOMContentLoaded", ()=>{
		let subHeads = Array.prototype.slice.call(document.querySelector("article h2"));

		let subHeadObserver = new IntersectionObserver((entries, observer)=>{
			entries.forEach((entry)=>{
				// Some code later.
			});
		});

		subHeads.forEach((subHead)=>subHeadObserver.observe(subHead));
	});
}
