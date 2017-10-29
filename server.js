require("babel-register");
import fs from "fs";
import path from "path";
import express from "express";
import http from "http";
import https from "https";
import mime from "mime";
import { h } from "preact";
import AssetManifest from "./dist/asset-manifest.json";

const webRoot = path.join(__dirname, "dist");
const app = new express();
const staticOptions = {
	setHeaders: (res, path, stat)=>{
		let resourceHints = [];

		if(mime.getType(path) === "text/html"){
			res.setHeader("Cache-Control", "private, no-cache, no-store");
		}
		else{
			res.setHeader("Cache-Control", "public, max-age=31536000");
		}

		if(process.env.NODE_ENV === "production"){
			res.removeHeader("X-Powered-By");
			res.setHeader("Service-Worker-Allowed", "/");
			res.setHeader("Strict-Transport-Security", "max-age=31536000");
		}

		if(mime.getType(path) === "text/html"){
			resourceHints.push(`<${AssetManifest["app.css"]}>; rel=preload; as=style`);
			resourceHints.push(`<${AssetManifest["images/skyline.svg"]}>; rel=preload; as=image; nopush`);
		}

		if(path.indexOf("/blog/") && mime.getType(path) === "text/html"){
			resourceHints.push("<https://res.cloudinary.com/>; rel=preconnect; crossorigin");
		}

		if(resourceHints.length > 0){
			res.setHeader("Link", resourceHints.toString());
		}

		res.setHeader("Vary", "Accept-Encoding, Save-Data");
	}
}

app.use(express.static(webRoot, staticOptions));

// Set up HTTP
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 8080);
let credentials = {};

// Set up HTTPS
if(process.env.NODE_ENV === "production"){
	credentials.ca = fs.readFileSync(process.env.SSL_CA, "utf8");
	credentials.key = fs.readFileSync(process.env.SSL_KEY, "utf8");
	credentials.cert = fs.readFileSync(process.env.SSL_CERT, "utf8");
}
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(process.env.SSL_PORT || 8443);
