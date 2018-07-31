/**
 * yall.js version 2.0.2
 * Yet Another Lazy loader
 **/

// The eponymous function
var yall = function(userOptions) {
  // This function handles the lazy loading of elements. It's kicked off by the
  // scroll handlers/intersection observers below in the eponymous function.
  let yallLoad = function(element) {
    // Lazy load <img> elements
    if (element.tagName === "IMG") {
      let parentElement = element.parentNode;

      // Is the parent element a <picture>?
      if (parentElement.tagName === "PICTURE") {
        [].slice.call(parentElement.querySelectorAll("source")).forEach(source => yallFlipDataAttrs(source));
      }

      if (env.asyncDecodeSupport === true && env.replaceWithSupport === true) {
        let newImageElement = new Image();
        yallFlipDataAttrs(newImageElement, element);

        newImageElement.decode().then(() => {
          for (let i = 0; i < element.attributes.length; i++) {
            let attrName = element.attributes[i].name;
            let attrValue = element.attributes[i].value;

            if (env.ignoredImgAttributes.indexOf(attrName) === -1) {
              newImageElement.setAttribute(attrName, attrValue);
            }
          }

          element.replaceWith(newImageElement);
        });
      } else {
        yallFlipDataAttrs(element);
      }
    }

    // Lazy load <video> elements
    if (element.tagName === "VIDEO") {
      [].slice.call(element.querySelectorAll("source")).forEach(source => yallFlipDataAttrs(source));
      element.load();
    }

    // Lazy load <iframe> elements
    if (element.tagName === "IFRAME") {
      element.src = element.dataset.src;
      element.removeAttribute("data-src");
    }
  };

  // Added because there was a number of patterns like this peppered throughout
  // the code. This just flips all the data- attrs on an element (after checking
  // to make sure the data attr is in a whitelist to avoid changing *all* of them)
  let yallFlipDataAttrs = function(element, refElement = false) {
    let sourceDataset = refElement.dataset || element.dataset;

    for (let dataAttribute in sourceDataset) {
      if (env.acceptedDataAttributes.indexOf(`data-${dataAttribute}`) !== -1) {
        element.setAttribute(dataAttribute, sourceDataset[dataAttribute]);
        element.removeAttribute(`data-${dataAttribute}`);
      }
    }
  };

  // When intersection observer is unavailable, this function is bound to scroll
  // (and other) event handlers to load images the "old" way.
  let yallBack = function() {
    let active = false;

    if (active === false && lazyElements.length > 0) {
      active = true;

      setTimeout(() => {
        lazyElements.forEach(lazyElement => {
          if (lazyElement.getBoundingClientRect().top <= (window.innerHeight + options.threshold) && lazyElement.getBoundingClientRect().bottom >= -(options.threshold) && getComputedStyle(lazyElement).display !== "none") {
            if (options.idlyLoad === true && env.idleCallbackSupport === true) {
              requestIdleCallback(() => {
                yallLoad(lazyElement);
              }, idleCallbackOptions);
            } else {
              yallLoad(lazyElement);
            }

            lazyElement.classList.remove(options.lazyClass);

            lazyElements = lazyElements.filter(element => element !== lazyElement);
          }
        });

        active = false;

        if (lazyElements.length === 0 && options.observeChanges === false) {
          env.eventsToBind.forEach(eventPair => eventPair[0].removeEventListener(eventPair[1], yallBack));
        }
      }, options.throttleTime);
    }
  };

  const testImage = new Image();
  const env = {
    intersectionObserverSupport: "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype,
    mutationObserverSupport: "MutationObserver" in window,
    idleCallbackSupport: "requestIdleCallback" in window,
    asyncDecodeSupport: "decode" in testImage,
    replaceWithSupport: "replaceWith" in testImage,
    ignoredImgAttributes: ["data-src", "data-sizes", "data-media", "data-srcset", "src", "srcset"],
    acceptedDataAttributes: ["data-src", "data-sizes", "data-media", "data-srcset"],
    eventsToBind: [
      [document, "scroll"],
      [document, "touchmove"],
      [window, "resize"],
      [window, "orientationchange"]
    ]
  };

  const options = {
    lazyClass: "lazy",
    throttleTime: 200,
    idlyLoad: false,
    idleLoadTimeout: 100,
    threshold: 200,
    observeChanges: false,
    observeRootSelector: "body",
    mutationObserverOptions: {
      childList: true
    },
    ...userOptions
  };
  const selectorString = `img.${options.lazyClass},video.${options.lazyClass},iframe.${options.lazyClass}`;
  const idleCallbackOptions = {
    timeout: options.idleLoadTimeout
  };

  let lazyElements = [].slice.call(document.querySelectorAll(selectorString));

  if (env.intersectionObserverSupport === true) {
    var intersectionListener = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting === true || entry.intersectionRatio > 0) {
          let element = entry.target;

          if (options.idlyLoad === true && env.idleCallbackSupport === true) {
            requestIdleCallback(() => {
              yallLoad(element);
            }, idleCallbackOptions);
          } else {
            yallLoad(element);
          }

          element.classList.remove(options.lazyClass);
          observer.unobserve(element);
          lazyElements = lazyElements.filter(lazyElement => lazyElement !== element);
        }
      });
    }, {
      rootMargin: `${options.threshold}px 0%`
    });

    lazyElements.forEach(lazyElement => intersectionListener.observe(lazyElement));
  } else {
    env.eventsToBind.forEach(eventPair => eventPair[0].addEventListener(eventPair[1], yallBack));
    yallBack();
  }

  if (env.mutationObserverSupport === true && options.observeChanges === true) {
    const mutationListener = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        [].slice.call(document.querySelectorAll(selectorString)).forEach(newElement => {
          if (lazyElements.indexOf(newElement) === -1) {
            lazyElements.push(newElement);

            if (env.intersectionObserverSupport === true) {
              intersectionListener.observe(newElement);
            } else {
              yallBack();
            }
          }
        });
      });
    });

    mutationListener.observe(document.querySelector(options.observeRootSelector), options.mutationObserverOptions);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  yall({
    threshold: 300,
    idlyLoad: true
  });
});

if ("matchMedia" in window && "IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
  document.addEventListener("DOMContentLoaded", () => {
    let navElement = document.getElementsByTagName("nav")[0];
    let navContainerElement = document.getElementsByClassName("nav-container")[0];
    let navSentinelElement = document.getElementsByClassName("nav-sentinel")[0];

    let navObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (matchMedia("(min-width: 50rem)").matches === true && entry.intersectionRatio < 1) {
          entry.target.classList.add("sticky-nav");
        }
      });
    }, {
      threshold: buildThresholdList(100),
      rootMargin: "0px 0px 1000% 0px"
    });

    let navSentinelObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (matchMedia("(min-width: 50rem)").matches === false || entry.isIntersecting === true) {
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

  function buildThresholdList(numSteps) {
    let thresholds = [];

    for (let i=1.0; i <= numSteps; i++) {
      let ratio = i / numSteps;
      thresholds.push(ratio);
    }

    thresholds.push(0);
    return thresholds;
  }
}
