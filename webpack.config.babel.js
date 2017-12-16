import regeneratorRuntime from "regenerator-runtime";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import webpack from "webpack";
import ImageminWebpackPlugin from "imagemin-webpack-plugin";
import ImageminPngQuant from "imagemin-pngquant";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import XmlWebpackPlugin from "xml-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
//import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import BrotliWebpackPlugin from "brotli-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import AssetsManifestWebpackPlugin from "webpack-assets-manifest";
import { h } from "preact";
import renderToString from "preact-render-to-string";

// These are global component definitions
import Illustration from "./src/components/Illustration";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

// These are XML feeds
import rss from "./src/routes/rss";
import sitemap from "./src/routes/sitemap";

// Promisified filesystem functions
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

// Prerendered components
const illustrationComponent = renderToString(<Illustration/>);
const headerComponent = renderToString(<Header/>);
const navigationComponent = renderToString(<Navigation/>);

// These are configuration/helper variables
const exclusions = /node_modules/i;
const routeExclusions = /\.js$/i;
const webRoot = path.join(__dirname, "dist");
const defaultHtmlOpts = {
	template: path.join(__dirname, "src/html/template.html"),
	inject: false,
	hash: false,
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		minifyJS: true
	},
	saveData: false
}

let entryPoints = {
	"vendors": ["preact", "preact-render-to-string"],
	"app": "./src/js/app.js"
};

const buildRoutes = async (routes, outputs = [])=>{
	let files = await readdir(routes);

	for(let file of files){
		let route = path.join(routes, file);

		if(route.indexOf("index.js") !== -1){
			let routeModule = require(route);
			let routeParts = routes.split(path.sep);
			let entryPointName = routeParts[routeParts.length - 1] === "routes" ? "index": routeParts[routeParts.length - 1];
			entryPoints[entryPointName] = route;

			let htmlOpts = {
				filename: path.join(routes.replace("src/routes", "dist"), "index.html"),
				chunks: ["app", entryPointName],
				title: routeModule.Metadata.title,
				description: routeModule.Metadata.description,
				components: {
					illustration: illustrationComponent,
					header: headerComponent,
					navigation: navigationComponent,
					content: renderToString(<routeModule.default saveData={false}/>)
				}
			};

			if(typeof routeModule.Metadata.canonical === "string"){
				htmlOpts = Object.assign(htmlOpts, {
					canonical: routeModule.Metadata.canonical
				});
			}

			outputs.push(new HtmlWebpackPlugin(Object.assign(defaultHtmlOpts, htmlOpts)));
			outputs.push(new HtmlWebpackPlugin(Object.assign(htmlOpts, {
				filename: path.join(routes.replace("src/routes", "dist"), "index.savedata.html"),
				saveData: true,
				components: {
					illustration: illustrationComponent,
					header: headerComponent,
					navigation: navigationComponent,
					content: renderToString(<routeModule.default saveData={true}/>)
				}
			})));
		}
		else{
			let stats = await lstat(route);

			if(stats.isDirectory() === true){
				await buildRoutes(route, outputs);
			}
		}
	}

	return outputs;
}

export default async ()=>{
	let xmlOutputs = [
		{
			template: path.join(__dirname, "src", "xml", "rss.ejs"),
			filename: "rss.xml",
			data: {
				rss: rss
			}
		},
		{
			template: path.join(__dirname, "src", "xml", "sitemap.ejs"),
			filename: "sitemap.xml",
			data: {
				sitemap: sitemap
			}
		}
	];

	return {
		entry: entryPoints,
		output: {
			filename: "js/[name].[chunkhash:8].js",
			path: webRoot,
			publicPath: "/"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: exclusions,
					use: "babel-loader"
				},
				{
					test: /\.css$/,
					exclude: exclusions,
					use: ExtractTextPlugin.extract({
						use: "css-loader!postcss-loader"
					})
				},
				{
					test: /\.(png|gif|jpe?g|svg)$/,
					exclude: exclusions,
					use: "file-loader?name=images/[name].[hash:8].[ext]"
				},
				{
					test: /\.(ttf|eot|woff2?)$/,
					exclude: exclusions,
					use: "file-loader?name=css/fonts/[name].[hash:8].[ext]"
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(webRoot),
			new ExtractTextPlugin("css/styles.[contenthash:8].css"),
			new FaviconsWebpackPlugin({
				logo: "./src/icons/favicon.png",
				prefix: "/",
				emitStats: true,
				title: "Jeremy Wagner's Web Development Blog",
				statsFilename: "icons.json",
				inject: false,
				icons:{
					appleStartup: false,
					firefox: false
				}
			}),
			new ImageminWebpackPlugin({
				svgo: {
					multipass: true,
					precision: 1
				}
			}),
			new ImageminWebpackPlugin({
				test: /(android-chrome|apple-touch|favicon).*\.(png|ico)$/i,
				plugins: [
					ImageminPngQuant({
						speed: 1
					})
				]
			}),
			...await buildRoutes(path.join(__dirname, "src", "routes")),
			new XmlWebpackPlugin({
				files: xmlOutputs
			}),
			// new WorkboxWebpackPlugin({
			// 	globDirectory: webRoot,
			// 	globPatterns: ["**\/*.{css,svg,woff2}"],
			// 	swDest: path.join(webRoot, "js", "sw.js")
			// }),
			new webpack.optimize.CommonsChunkPlugin({
				names: ["vendors", "app"],
				minChunks: Infinity
			}),
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, "src", "*.txt"),
					to: path.join(__dirname, "dist"),
					flatten: true
				}
			]),
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify("production")
				},
				"global.GENTLY": false
			}),
			new webpack.optimize.UglifyJsPlugin(),
			new CompressionWebpackPlugin({
				test: /\.(html?|xml|css|js|svg|ttf|eot)$/,
				minRatio: 1,
				threshold: 0
			}),
			new BrotliWebpackPlugin({
				test: /\.(html?|xml|css|js|svg|ttf|eot)$/,
				minRatio: 1,
				threshold: 0
			}),
			new AssetsManifestWebpackPlugin({
				output: "assets-manifest.json",
				publicPath: "/"
			})
		]
	}
};
