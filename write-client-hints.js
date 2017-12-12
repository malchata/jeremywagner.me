import assets from "./dist/assets-manifest.json";

let hints = [
	assets["app.css"],
	assets["app.js"],
	assets["images/skyline.svg"],
	assets["css/fonts/fredokaone.woff2"],
	assets["css/fonts/monoton.woff2"]
];
let config = `<FilesMatch "\\.(html|html\\.gz|html\\.br)$">
Header set Link "`;

for(let asset in hints){
	let assetType = "";
	let assetContentType = "";
	let assetParts = hints[asset].split(".");

	switch(assetParts[assetParts.length - 1]){
		case "css":
			assetType = "style";
			assetContentType = "text/css";
		break;

		case "js":
			assetType = "script";
			assetContentType = "text/javascript";
		break;

		case "jpg":
		case "jpeg":
			assetType = "image";
			assetContentType = "image/jpeg";
		break;

		case "png":
			assetType = "image";
			assetContentType = "image/png";
		break;

		case "gif":
			assetType = "image";
			assetContentType = "image/gif";
		break;

		case "svg":
			assetType = "image";
			assetContentType = "image/svg+xml";
		break;

		case "woff2":
			assetType = "font";
			assetContentType = "font/woff2";
		break;
	}

	config += `<${hints[asset]}>; rel=preload; as=${assetType}; type=${assetContentType}; nopush`;

	if(hints.indexOf(hints[asset]) < hints.length - 1){
		config += ",";
	}
}

config += `"
</FilesMatch>`;

console.log(config);
