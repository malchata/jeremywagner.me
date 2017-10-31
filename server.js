require("babel-register");
import { readFileSync, readFile } from "fs";
import { join } from "path";
import express from "express";
import http from "http";
import https from "https";
import mime from "mime";
import { h } from "preact";
import assets from "./dist/assets.json";

const webRoot = join(__dirname, "dist");
const app = new express();

let viewCache = {};
let assetCache = {};
let assetRoutes = [];

for(let asset in assets){
	assetRoutes.push(assets[asset]);
}

const viewHandler = (req, res, next)=>{
	let saveData = req.headers["save-data"] === "on" ? true : false;
	let acceptedEncodings = req.headers["accept-encoding"].split(", ");
	let isBlogEntry = req.path.indexOf("/blog/") !== -1 ? true : false;
	let resourceHints = [
		`<${assets["app.css"]}>; rel=preload; as=style`,
		`<${assets["images/skyline.svg"]}>; rel=preload; as=image; nopush`,
		`<${assets["css/fonts/monoton.woff2"]}>; rel=preload; as=font; nopush`,
		`<${assets["css/fonts/fredokaone.woff2"]}>; rel=preload; as=font; nopush`
	];
	let contentEncoding;

	// Determine the accept-encoding preference
	contentEncoding = null;

	if(acceptedEncodings.indexOf("br") !== -1){
		contentEncoding = "br";
	}
	else if(acceptedEncodings.indexOf("gzip") !== -1){
		contentEncoding = "gzip"
	}

	// Get view information
	let viewRef = saveData === true ? join(webRoot, req.params.slug, "index.savedata.html") : join(webRoot, req.params.slug, "index.html");

	// Modify the view based on the content encoding value
	if(contentEncoding === "br"){
		viewRef = `${viewRef}.br`;
	}
	else if(contentEncoding === "gzip"){
		viewRef = `${viewRef}.gz`;
	}

	// Point to a blog entry if need be
	if(isBlogEntry === true){
		viewRef = viewRef.split("/dist/").join("/dist/blog/");
		resourceHints.push("<https://res.cloudinary.com/>; rel=preconnect; crossorigin");
	}

	// Examine the view cache first
	if(typeof viewCache[viewRef] === "undefined"){
		viewCache[viewRef] = new Buffer(readFileSync(viewRef));
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

	res.send(viewCache[viewRef]);
};

const assetHandler = (req, res, next)=>{
	// Get asset information
	let assetRef = join(webRoot, req.path);
	let contentType = mime.getType(assetRef);
	let contentEncoding = null;

	if(/\.(txt|css|js|ttf|eot|svg)$/i.test(assetRef) === true){
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

	if(typeof assetCache[assetRef] === "undefined"){
		assetCache[assetRef] = new Buffer(readFileSync(assetRef));
	}

	let headers = {
		"Vary": "Accept-Encoding",
		"Cache-Control": "public, max-age=31557600",
		"Content-Type": contentType
	};

	// Check if we need to set a Content-Encoding header and change the view
	if(contentEncoding !== null){
		headers["Content-Encoding"] = contentEncoding;
	}

	// Set all the headers
	for(let header in headers){
		res.setHeader(header, headers[header]);
	}

	res.send(assetCache[assetRef]);
}

app.get("*", (req, res, next)=>{
	res.removeHeader("X-Powered-By");
	res.setHeader("Strict-Transport-Security", "max-age=31536000");
	res.setHeader("Service-Worker-Allowed", "/");
	next();
});
app.get(assetRoutes, assetHandler);
app.get(["/writing", "/about", "/hire", "/:blog/:slug"], viewHandler);

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
