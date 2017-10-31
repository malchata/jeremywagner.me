require("babel-register");
import { readFileSync, readFile } from "fs";
import { join } from "path";
import express from "express";
import http from "http";
import https from "https";
import { getType } from "mime";
import { h } from "preact";
import AssetManifest from "./dist/asset-manifest.json";

const webRoot = join(__dirname, "dist");
const app = new express();
// const staticOptions = {
// 	setHeaders: (res, path, stat)=>{
// 		let resourceHints = [];
//
// 		if(getType(path) === "text/html"){
// 			res.setHeader("Cache-Control", "private, no-cache, no-store");
// 		}
// 		else{
// 			res.setHeader("Cache-Control", "public, max-age=31536000");
// 		}
//
// 		if(process.env.NODE_ENV === "production"){
// 			res.removeHeader("X-Powered-By");
// 			res.setHeader("Service-Worker-Allowed", "/");
// 			res.setHeader("Strict-Transport-Security", "max-age=31536000");
// 		}
//
// 		if(indexOf("/blog/") && getType(path) === "text/html"){
// 			resourceHints.push("<https://res.cloudinary.com/>; rel=preconnect; crossorigin");
// 		}
//
// 		if(resourceHints.length > 0){
// 			res.setHeader("Link", resourceHints.toString());
// 		}
//
// 		res.setHeader("Vary", "Accept-Encoding, Save-Data");
// 	}
// }
//
// app.use(express.static(webRoot, staticOptions));

let viewCache = {};

const viewHandler = (req, res, next)=>{
	let saveData = req.headers["save-data"] === "on" ? true : false;
	let acceptedEncodings = req.headers["accept-encoding"].split(", ");
	let resourceHints = [`<${AssetManifest["app.css"]}>; rel=preload; as=style`, `<${AssetManifest["images/skyline.svg"]}>; rel=preload; as=image; nopush`];
	let contentEncoding;

	// Determine the accept-encoding preference
	if(acceptedEncodings.indexOf("br") !== -1){
		contentEncoding = "br";
	}
	else if(acceptedEncodings.indexOf("gzip") !== -1){
		contentEncoding = "gzip"
	}
	else{
		contentEncoding = null;
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

	// TODO: Examine the view cache first
	if(typeof viewCache[viewRef] === "undefined"){
		viewCache[viewRef] = new Buffer(readFileSync(viewRef));
	}

	// Set headers
	let headers = {
		"Vary": "Accept-Encoding, Save-Data",
		"Content-Type": "text/html; charset=UTF-8",
		"Cache-Control": "private, no-store, no-cache",
		// "Content-Length": viewCache[viewRef].length,
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

	console.log(viewRef);
	res.send(viewCache[viewRef]);
};

app.get("*", (req, res, next)=>{
	res.removeHeader("X-Powered-By");
	res.setHeader("Strict-Transport-Security", "max-age=31536000");
	res.setHeader("Service-Worker-Allowed", "/");
	next();
});
app.get(["/:slug", "/:blog/:slug"], viewHandler);

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
