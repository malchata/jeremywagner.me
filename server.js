require("babel-register");
import { readFileSync, readFile } from "fs";
import { join } from "path";
import express from "express";
import http from "http";
import https from "https";
import mime from "mime";
import { h } from "preact";
import assets from "./dist/assets.json";
import icons from "./dist/icons.json";

const webRoot = join(__dirname, "dist");
const app = new express();

let itemCache = {};
let assetRoutes = [...assets, ...icons.files];
assetRoutes.push("/humans.txt", "/robots.txt", "/license.txt", "/rss.xml", "/sitemap.xml");

const viewHandler = (req, res, next)=>{
	console.dir(req.path);
	let saveData = req.headers["save-data"] === "on" ? true : false;
	let acceptedEncodings = req.headers["accept-encoding"].split(", ");
	let isBlogEntry = req.path.indexOf("/blog/") !== -1 ? true : false;
	let resourceHints = [
		`<${assets["app.css"]}>; rel=preload; as=style`,
		`<${assets["images/skyline.svg"]}>; rel=preload; as=image; nopush`,
		// `<${assets["css/fonts/monoton.woff2"]}>; rel=preload; as=font; nopush`,
		// `<${assets["css/fonts/fredokaone.woff2"]}>; rel=preload; as=font; nopush`
	];
	let viewRef = saveData === true ? join(webRoot, req.params.slug, "index.savedata.html") : join(webRoot, req.params.slug, "index.html");
	let contentEncoding = null;

	if(acceptedEncodings.indexOf("br") !== -1){
		contentEncoding = "br";
		viewRef = `${viewRef}.br`;
	}
	else if(acceptedEncodings.indexOf("gzip") !== -1){
		contentEncoding = "gzip"
		viewRef = `${viewRef}.gz`;
	}

	console.log(viewRef);

	// Point to a blog entry if need be
	if(isBlogEntry === true){
		viewRef = viewRef.split("/dist/").join("/dist/blog/");
		resourceHints.push("<https://res.cloudinary.com/>; rel=preconnect; crossorigin");
	}

	// Examine the view cache first
	if(typeof itemCache[viewRef] === "undefined"){
		itemCache[viewRef] = new Buffer(readFileSync(viewRef));
	}

	// Set headers
	let headers = {
		"Vary": "Accept-Encoding, Save-Data",
		"Content-Type": "text/html; charset=UTF-8",
		"Cache-Control": "private, no-store, no-cache",
		"Link": resourceHints.toString()
	}

	// Check if we need to set a Content-Encoding header and change the view
	if(contentEncoding !== null){
		headers["Content-Encoding"] = contentEncoding;
	}

	// Set all the headers
	for(let header in headers){
		res.setHeader(header, headers[header]);
	}

	res.send(itemCache[viewRef]);
};

const assetHandler = (req, res, next)=>{
	let assetRef = join(webRoot, req.path);
	let contentType = mime.getType(assetRef);
	let contentEncoding = null;

	if(/\.(css|js|ttf|eot|svg)$/i.test(assetRef) === true){
		let acceptedEncodings = req.headers["accept-encoding"].split(", ");

		if(acceptedEncodings.indexOf("br") !== -1){
			contentEncoding = "br";
			assetRef = `${assetRef}.br`;
		}
		else if(acceptedEncodings.indexOf("gzip") !== -1){
			contentEncoding = "gzip"
			assetRef = `${assetRef}.gz`;
		}
	}

	if(typeof itemCache[assetRef] === "undefined"){
		itemCache[assetRef] = new Buffer(readFileSync(assetRef));
	}

	let headers = {
		"Vary": "Accept-Encoding",
		"Cache-Control": "public, max-age=31557600",
		"Content-Type": ["text/css", "image/svg+xml", "application/javascript", "application/x-javascript", "text/xml", "text/plain", "text/html", "text/javascript"].indexOf(contentType) !== -1 ? `${contentType}; charset=UTF-8` : contentType
	};

	// Check if we need to set a Content-Encoding header and change the view
	if(contentEncoding !== null){
		headers["Content-Encoding"] = contentEncoding;
	}

	for(let header in headers){
		res.setHeader(header, headers[header]);
	}

	res.send(itemCache[assetRef]);
};

app.get("*", (req, res, next)=>{
	res.removeHeader("X-Powered-By");
	res.setHeader("Strict-Transport-Security", "max-age=31536000");
	res.setHeader("Service-Worker-Allowed", "/");
	next();
});
app.get(assetRoutes, assetHandler);
app.get(["/:slug", "/blog/:slug"], viewHandler);

// Set up HTTP
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 8080);
let credentials = {};

// Set up HTTPS
if(process.env.NODE_ENV === "production"){
	credentials.ca = readFileSync(process.env.SSL_CA, "utf8");
	credentials.key = readFileSync(process.env.SSL_KEY, "utf8");
	credentials.cert = readFileSync(process.env.SSL_CERT, "utf8");
}
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.SSL_PORT || 8443);
