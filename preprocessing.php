<?php
// The current host root URL (with security context)
$currentHost = $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"];

// Checks to see if a post is a blog
$isBlog = stristr($_SERVER["REQUEST_URI"], "/blog") !== false;

// Check for the user agent
if(isset($_SERVER["HTTP_USER_AGENT"]) === true){
	$ua = urlencode($_SERVER["HTTP_USER_AGENT"]);
}
else{
	$ua = urlencode("no-user-agent");
}

// Path Prefix Variable
if($isBlog){
	$pathPrefix = realpath("./../");
	$pageUrl = $currentHost . $_SERVER["REQUEST_URI"];
	$pageId = md5($_SERVER["REQUEST_URI"]);
}
else{
	$pathPrefix = realpath("./");
}

// Is development server
if(stristr($_SERVER["HTTP_HOST"], "dev.jeremywagner.me") !== false){
	$isDevServer = true;
}
else{
	$isDevServer = false;
}

// Asset versioning
$versions = array(
	"global.css" => crc32(file_get_contents($pathPrefix . "/css/global.css")),
	"scripts.js" => crc32(file_get_contents($pathPrefix . "/js/scripts.js"))
);

// Image markup generator
function generateImageMarkup($lazy, $picture, $sources, $caption){
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
?>
