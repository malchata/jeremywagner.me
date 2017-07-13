<?php
// The current host root URL (with security context)
$currentHost = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"];

// Checks to see if a post is a blog
$isAmp = stristr($_SERVER["REQUEST_URI"], "/blog/amp") !== false;
$isBlog = stristr($_SERVER["REQUEST_URI"], "/blog") !== false;
$isHttp2 = stristr($_SERVER["SERVER_PROTOCOL"], "HTTP/2") ? true : false;

// Check for the user agent
if(isset($_SERVER["HTTP_USER_AGENT"]) === true){
	$ua = urlencode($_SERVER["HTTP_USER_AGENT"]);
}
else{
	$ua = urlencode("no-user-agent");
}

// Path Prefix Variable
if($isAmp){
	$pathPrefix = realpath("./../../");
	$canonicalUrl = $currentHost . str_ireplace("/amp/", "/", $_SERVER["REQUEST_URI"]);
	$pageUrl = $currentHost . $_SERVER["REQUEST_URI"];
	$ampUrl = str_ireplace("/blog/", "/blog/amp/", $pageUrl);
}
elseif($isBlog){
	$pathPrefix = realpath("./../");
	$pageUrl = $currentHost . $_SERVER["REQUEST_URI"];
	$ampUrl = str_ireplace("/blog/", "/blog/amp/", $pageUrl);
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
$versions["global.css"] = cacheString("global.css", "/css/global.css", $pathPrefix);
$versions["ga.js"] = cacheString("ga.js", "/js/ga.js", $pathPrefix);
$versions["scripts.js"] = cacheString("scripts.js", "/js/scripts.js", $pathPrefix);
$versions["debounce.js"] = cacheString("debounce.js", "/js/debounce.js", $pathPrefix);
$versions["lazyload.js"] = cacheString("lazyload.js", "/js/lazyload.js", $pathPrefix);
$versions["nav.js"] = cacheString("nav.js", "/js/nav.js", $pathPrefix);
$versions["attach-nav.js"] = cacheString("attach-nav.js", "/js/attach-nav.js", $pathPrefix);
$versions["load-fonts.js"] = cacheString("load-fonts.js", "/js/load-fonts.js", $pathPrefix);

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

// Cache string generator
function cacheString($cacheKey, $string, $pathPrefix){
	$checksumCacheDir = "/var/www/caches/cache-keys/";
	$checksumCache = "/var/www/caches/cache-keys/" . $cacheKey;

	if(file_exists($checksumCache)){
		return file_get_contents($checksumCache);
	}
	else{
		if(is_dir($checksumCacheDir) === false){
			mkdir($checksumCacheDir, 0755);
		}

		$checksum = substr(md5_file($pathPrefix . $string), 0, 8);
		file_put_contents($checksumCache, $checksum, LOCK_EX);
		return $checksum;
	}
}

// Push function
function pushAssets($versions){
	$pushes = array(
		"/css/global.css" => $versions["global.css"]
	);

	if(!isset($_COOKIE["h2pushes"])){
		$pushString = buildPushString($pushes);
		header($pushString);
		setcookie("h2pushes", json_encode($pushes), 0, 2592000, "", ".jeremywagner.me", true);
	}
	else{
		$serializedPushes = serialize($pushes);

		if($serializedPushes !== $_COOKIE["h2pushes"]){
			$oldPushes = json_decode($_COOKIE["h2pushes"], true);
			$diff = array_diff_assoc($pushes, $oldPushes);
			$pushString = buildPushString($diff);

			if(count($diff) > 0){
				header($pushString);
				setcookie("h2pushes", json_encode($pushes), 0, 2592000, "", ".jeremywagner.me", true);
			}
		}
	}
}

function buildPushString($pushes){
	$pushString = "Link: ";

	foreach($pushes as $asset => $version){
		$pushString .= "<" . $asset . "?v=" . $version . ">; rel=preload";

		if(stristr($asset, ".css") !== false){
			$pushString .= "; as=style";
		}
		elseif(stristr($asset, ".js") !== false){
			$pushString .= "; as=script";
		}

		if($asset !== end($pushes)){
			$pushString .= ",";
		}
	}

	return $pushString;
}

pushAssets($versions);

// Image markup generator
function generateImageMarkup($lazy, $picture, $sources, $isAmp, $caption){
	$markup = "<figure>";

	if($isAmp === true){
		foreach($sources as $tag => $attributes){
			if($tag === "amp-img"){
				$markup .= "<amp-img";

				foreach($attributes as $attribute => $value){
					$markup .= " " . $attribute . "=\"" . $value . "\"";
				}

				$markup .= " alt=\"" . $caption . "\" layout=\"responsive\"></amp-img>";
			}
		}
	}
	else{
		if($picture === true){
			$markup .= "<picture>";
		}

		foreach($sources as $tag => $attributes){
			if($tag !== "amp-img"){
				if($tag === "source"){
					foreach($attributes as $sourceAttributes){
						$markup .= "<source";

						foreach($sourceAttributes as $sourceAttribute => $sourceAttributeValue){
							if($lazy === true && ($sourceAttribute ==="srcset")){
								$markup .= " data-" . $sourceAttribute . "=\"" . $sourceAttributeValue . "\"";
							}
							else{
								$markup .= " " . $sourceAttribute . "=\"" . $sourceAttributeValue . "\"";
							}
						}

						$markup .= ">";
					}
				}
				else{
					$markup .= "<" . $tag;

					foreach($attributes as $attribute => $value){
						if($lazy === true && ($attribute === "src" || $attribute ==="srcset")){
							$markup .= " data-" . $attribute . "=\"" . $value . "\"";
						}
						else{
							$markup .= " " . $attribute . "=\"" . $value . "\"";
						}
					}

					if($tag === "img"){
						$markup .= " title=\"" . $caption . "\" alt=\"" . $caption . "\" class=\"figure-image";

						if($lazy === true){
							$markup .= " lazy";
						}

						$markup .= "\"";
					}

					$markup .= ">";
				}
			}
		}

		if($picture === true){
			$markup .= "</picture>";
		}

		if($lazy === true){
			$markup .= "<noscript>";

			if($picture === true){
				$markup .= "<picture>";
			}

			foreach($sources as $tag => $attributes){
				if($tag !== "amp-img"){
					if($tag === "source"){
						foreach($attributes as $sourceAttributes){
							$markup .= "<source";

							foreach($sourceAttributes as $sourceAttribute => $sourceAttributeValue){
								$markup .= " " . $sourceAttribute . "=\"" . $sourceAttributeValue . "\"";
							}

							$markup .= ">";
						}
					}
					else{
						$markup .= "<" . $tag;

						foreach($attributes as $attribute => $value){
							$markup .= " " . $attribute . "=\"" . $value . "\"";
						}

						if($tag === "img"){
							$markup .= " title=\"" . $caption . "\" alt=\"" . $caption . "\" class=\"figure-image\"";
						}

						$markup .= ">";
					}
				}
			}

			if($picture === true){
				$markup .= "</picture>";
			}

			$markup .= "</noscript>";
		}
	}

	$markup .= "<figcaption>";
	$markup .= "<span>";
	$markup .= $caption;
	$markup .= "</span>";
	$markup .= "</figcaption>";
	$markup .= "</figure>";

	return $markup;
}
?>
