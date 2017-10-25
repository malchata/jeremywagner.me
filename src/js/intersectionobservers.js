if("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype){
	document.addEventListener("DOMContentLoaded", ()=>{
		let subHeadObserver = new IntersectionObserver((entries, observer)=>{
			entries.forEach((entry)=>{
				// Code here
			});
		});

		let navObserver = new IntersectionObserver((entries, observer)=>{
			entries.forEach((entry)=>{
				// Code here
			});
		});

		document.querySelectorAll("article h2").forEach((subHead)=>subHeadObserver.observe(subHead));
		navObserver.observe(document.querySelector("nav"));
	});
}
