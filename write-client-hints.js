import assets from "./dist/assets-manifest.json";

let hints = [{
  asset: assets["app.css"],
  push: true
},
{
  asset: assets["css/fonts/fredokaone.woff2"],
  crossorigin: "anonymous"
},
{
  asset: assets["css/fonts/monoton.woff2"],
  crossorigin: "anonymous"
},
{
  asset: assets["css/fonts/firasans-regular.woff2"],
  crossorigin: "anonymous"
},
{
  asset: assets["css/fonts/firasans-bold.woff2"],
  crossorigin: "anonymous"
}];

let config = `<FilesMatch "\\.(html|html\\.gz|html\\.br)$">
Header set Link "`;

for(let asset in hints) {
  let assetType, assetContentType, assetParts = hints[asset].asset.split(".");

  switch(assetParts[assetParts.length - 1]) {
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

  config += `<${hints[asset].asset}>; rel=preload; as=${assetType}; type=${assetContentType}`;

  if (typeof hints[asset].crossorigin !== "undefined") {
    config += `; crossorigin=${hints[asset].crossorigin}`;
  }

  if (typeof hints[asset].push === "undefined") {
    config += "; nopush";
  }

  if (hints.indexOf(hints[asset]) < hints.length - 1) {
    config += ",";
  }
}

config += `"
</FilesMatch>`;

console.log(config);
