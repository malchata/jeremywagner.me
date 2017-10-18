import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import { h } from "preact";

const webRoot = path.join(__dirname, "dist");
const app = new express();
const staticOptions = {
	etag: false,
	setHeaders: (res, path, stat)=>{
		// Set up resource hints
		let resourceHints = "<https://fonts.googleapis.com>; rel=preconnect; crossorigin";

		res.removeHeader("X-Powered-By");
		res.setHeader("Cache-Control", "public, max-age=31536000");
		res.setHeader("Service-Worker-Allowed", "/");

		if(path.indexOf("/blog/")){
			resourceHints += ",<https://res.cloudinary.com>; rel=preconnect; crossorigin";
		}

		res.setHeader("Link", resourceHints);
	}
}

app.use(express.static(webRoot, staticOptions));
app.use(compression());
app.listen(process.env.PORT || 8080);
