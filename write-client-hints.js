import assets from "./dist/assets-manifest.json";

let hints = [assets["app.css"], assets["app.js"], assets["images/skyline.svg"]];
let config = `<FilesMatch "\\.html$">
Header set Link "`;

for(let asset in hints){
	let assetType = "";

	switch(hints[asset].split(".")[hints.length - 1]){
		case "css":
			assetType = "style";
		break;

		case "js":
			assetType = "script";
		break;

		case "svg":
		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
			assetType = "image";
		break;

		case "woff2":
			assetType = "font";
		break;
	}

	config += `<${hints[asset]}>;rel=preload;as=${assetType};nopush`;

	if(hints.indexOf(hints[asset]) < hints.length - 1){
		config += ",";
	}
}

config += `"
</FilesMatch>`;

console.log(config);
