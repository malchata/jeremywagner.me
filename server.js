import fs from "fs";
import path from "path";
import express from "express";
import compression from "compression";
import render from "preact-render-to-string";
import { h } from "preact";

const app = new express();
const staticOptions = {
	etag: false,
	setHeaders: (res)=>{
		res.setHeader("Cache-Control", "public,max-age=31536000,stale-while-revalidate=86400");
		res.removeHeader("X-Powered-By");
		res.setHeader("Service-Worker-Allowed", "/");
	}
}
const pageMarkup = {
	index: fs.readFileSync(path.join(__dirname, "index.html")).toString()
};

app.use("/css", express.static(path.join(__dirname, "css"), staticOptions));
app.use("/images", express.static(path.join(__dirname, "images"), staticOptions));
app.use(compression());

app.get("/", (req, res)=>{
	res.setHeader("Cache-Control", "private,no-cache,no-store,max-age=0");
	res.send(pageMarkup.index);
});

app.listen(8080);
