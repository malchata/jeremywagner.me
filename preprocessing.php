<?php
// The current host root URL (with security context)
$currentHost = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"];

// The current page
$pageUrl = $currentHost . $_SERVER["REQUEST_URI"];

// Checks to see if a post is a blog
$isBlog = stristr($_SERVER["REQUEST_URI"], "/blog") !== false;

// Creates a path prefix
$pathPrefix = $isBlog === true ? $pathPrefix = realpath("./../") : $pathPrefix = realpath("./");

// Checks if current instance is the dev instance
$isDevServer = stristr($_SERVER["HTTP_HOST"], "dev.jeremywagner.me") !== false ? true : false;

// Check if the Save-Data header has been sent
$saveData = isset($_SERVER["HTTP_SAVE_DATA"]) && stristr($_SERVER["HTTP_SAVE_DATA"], "on") !== false ? true : false;

// Check if the browser advertises WebP support
$webp = isset($_SERVER["HTTP_ACCEPT"]) && stristr($_SERVER["HTTP_ACCEPT"], "image/webp") !== false ? true : false;

// Path Prefix Variable
if($isBlog === true){
	$pageId = md5($_SERVER["REQUEST_URI"]);
}

// Asset versioning
$versions = array(
	"global.css" => substr(md5_file($pathPrefix . "/css/global.css"), 0, 8),
	"scripts.js" => substr(md5_file($pathPrefix . "/js/scripts.js"), 0, 8)
);

// Image markup generator
function generateImageMarkup($lazy, $picture, $sources, $caption, $saveData = false){
	if($saveData === false){
		$markup = "<figure>";

		if($picture === true){
			$markup .= "<picture>";
		}

		foreach($sources as $tag => $attributes){
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

		if($picture === true){
			$markup .= "</picture>";
		}

		if($lazy === true){
			$markup .= "<noscript>";

			if($picture === true){
				$markup .= "<picture>";
			}

			foreach($sources as $tag => $attributes){
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

			if($picture === true){
				$markup .= "</picture>";
			}

			$markup .= "</noscript>";
		}

		$markup .= "<figcaption>";
		$markup .= "<span>";
		$markup .= $caption;
		$markup .= "</span>";
		$markup .= "</figcaption>";
		$markup .= "</figure>";

		return $markup;
	}
}

// Adapted from this solution: https://stackoverflow.com/questions/1583740/304-not-modified-and-front-end-caching
function send304IfNotModified($uri){
	$lastModifiedTime = filemtime($uri);
	header("Last-Modified: " . gmdate("D, d M Y H:i:s", $lastModifiedTime) . " GMT");

	if(@strtotime($_SERVER["HTTP_IF_MODIFIED_SINCE"]) == $lastModifiedTime){
		header("HTTP/1.1 304 Not Modified");
		exit;
	}
}
?>
