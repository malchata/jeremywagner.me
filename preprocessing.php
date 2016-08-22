<?php
// Checks to see if a post is a blog
$isBlog = stristr($_SERVER["REQUEST_URI"], "/blog");
$isSpeakerInfo = stristr($_SERVER["REQUEST_URI"], "/speaker-info");
$isHttp2 = stristr($_SERVER["SERVER_PROTOCOL"], "HTTP/2") ? true : false;

// Path Prefix Variable
if($isBlog){
	$pathPrefix = realpath("./../");
	$pageUrl = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
	$pageId = md5($_SERVER["REQUEST_URI"]);
}
else{
	$pathPrefix = realpath("./");
}

// Is development server
if(stristr($_SERVER["HTTP_HOST"], "dev.jeremywagner.me")){
	$isDevServer = true;
}
else{
	$isDevServer = false;
}

// Asset versioning
$versions = [];
$versions["global.css"] = cacheString("/css/global.css", $pathPrefix);
$versions["fonts-loaded.css"] = cacheString("/css/fonts-loaded.css", $pathPrefix);
$versions["ga.js"] = cacheString("/js/ga.js", $pathPrefix);
$versions["scripts.js"] = cacheString("/js/scripts.js", $pathPrefix);
$versions["debounce.js"] = cacheString("/js/debounce.js", $pathPrefix);
$versions["lazyload.js"] = cacheString("/js/lazyload.js", $pathPrefix);
$versions["nav.js"] = cacheString("/js/nav.js", $pathPrefix);
$versions["attach-nav.js"] = cacheString("/js/attach-nav.js", $pathPrefix);
$versions["load-fonts.js"] = cacheString("/js/load-fonts.js", $pathPrefix);
//$versions["sw-install.js"] = cacheString("/js/sw-install.js", $pathPrefix);


function httpClass($h2){
	if($h2 === true){
		return "http2";
	}
	else{
		return "http1";
	}
}

// Font Loading Class Control
function fontsLoaded(){
	if(isset($_COOKIE["fonts-loaded"])){
		return "fonts-loaded";
	}
}

// Headers
function generateLinkHeaders($h2, $versions, $isBlog, $isDevServer){
	// Establish global link headers
	$headers["Link"] = "</css/global.css?v=" . $versions["global.css"] . ">; rel=preload; as=style" .
		",</img/global/jeremy.svg>; rel=preload; as=image";

	// Set headers
	if($h2 === true){
		$headers["Link"] .= ",</css/fonts-loaded.css?v=" . $versions["fonts-loaded.css"] . ">; rel=preload; as=style";

			if($isDevServer === false){
				$headers["Link"] .= ",</js/ga.js?v=" . $versions["ga.js"] . ">; rel=preload; as=script";
			}

			$headers["Link"] .=",</js/debounce.js?v=" . $versions["debounce.js"] . ">; rel=preload; as=script" .
			",</js/lazyload.js?v=" . $versions["lazyload.js"] . ">; rel=preload; as=script" .
			",</js/nav.js?v=" . $versions["nav.js"] . ">; rel=preload; as=script" .
			",</js/attach-nav.js?v=" . $versions["attach-nav.js"] . ">; rel=preload; as=script" .
			",</js/load-fonts.js?v=" . $versions["load-fonts.js"] . ">; rel=preload; as=script" .
			//",</js/sw-install.js?v=" . $versions["sw-install.js"] . ">; rel=preload; as=script" .
			",</img/global/icon-email.svg>; rel=preload; as=image" .
			",</img/global/icon-github.svg>; rel=preload; as=image" .
			",</img/global/icon-linked-in.svg>; rel=preload; as=image" .
			",</img/global/icon-twitter.svg>; rel=preload; as=image";
	}
	else{
		$headers["Link"] .= ",</js/scripts.js?v=" . $versions["scripts.js"] . ">; rel=preload; as=script" .
			",</img/global/sprite.svg>; rel=preload; as=image";
	}

	// Check if this is a blog page.
	if($isBlog){
		$headers["Link"] .= ",<https://jeremywagner.disqus.com>; rel=preconnect" .
			",<https://a.disquscdn.com>; rel=preconnect" .
			",<https://disqus.com>; rel=preconnect" .
			",<https://referrer.disqus.com>; rel=preconnect";
	}

	// Other preconnect headers
	$headers["Link"] .= ",<https://www.google-analytics.com>; rel=preconnect" .
			",<https://fonts.gstatic.com>; rel=preconnect" .
			",<https://fonts.googleapis.com>; rel=preconnect" .
			",<https://ssl.google-analytics.com>; rel=preconnect";

	// Apply headers
	foreach($headers as $headerName => $headerValue){
		header($headerName . ": " . $headerValue);
	}
}

// Cache string generator
function cacheString($string, $pathPrefix){
	return substr(md5_file($pathPrefix . $string), 0, 8);
}

generateLinkHeaders($isHttp2, $versions, $isBlog, $isDevServer);
?>