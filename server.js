import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import { h } from "preact";

const webRoot = path.join(__dirname, "dist");
const app = new express();
const staticOptions = {
	etag: false,
	setHeaders: (res)=>{
		res.setHeader("Cache-Control", "public,max-age=31536000");
		res.removeHeader("X-Powered-By");
		res.setHeader("Service-Worker-Allowed", "/");
	}
}

app.use(express.static(webRoot));
app.get("/content/:component", (req, res)=>{

});
app.use(compression());
app.listen(process.env.PORT || 8080);
