import fs from "fs";
import path from "path";
import webpack from "webpack";
import ImageminPlugin from "imagemin-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import XmlWebpackPlugin from "xml-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import ManifestWebpackPlugin from "webpack-manifest-plugin";
import CompressionWebpackPlugin from "compression-webpack-plugin";
import BrotliWebpackPlugin from "brotli-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import { h } from "preact";
import renderToString from "preact-render-to-string";

// These are global component definitions
import Illustration from "./src/components/Illustration";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

// These are XML feeds
import { RSSFeed } from "./src/components/RSSFeed";
import Sitemap from "./src/components/Sitemap";

const exclusions = /node_modules/i;
const webRoot = path.join(__dirname, "dist");

let entryPoints = {
	"vendors": ["preact", "preact-render-to-string"],
	"app": "./src/js/app.js"
};
let markupOutputs = [];
let xmlOutputOptions = {
	template: path.join(__dirname, "src/xml/template.xml"),
	inject: false,
	hash: false,
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		minifyJS: true
	}
};

function buildRoutes(routes){
	fs.readdirSync(routes).forEach((route)=>{
		if(route.indexOf("index.js") !== -1){
			let routeModule = require(path.join(routes, route));
			let metadata = routeModule.Metadata;
			let Content = routeModule.default;
			let routeParts = routes.split(path.sep);
			let entryPointName = routeParts[routeParts.length - 1] === "routes" ? "index" : routeParts[routeParts.length - 1];
			entryPoints[entryPointName] = path.join(routes, route);

			let htmlOpts = {
				template: path.join(__dirname, "src/html/template.html"),
				filename: path.join(routes.replace("src/routes", "dist"), "index.html"),
				inject: false,
				hash: false,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					minifyJS: true
				},
				chunks: ["app", entryPointName],
				title: metadata.title,
				description: metadata.description,
				saveData: false,
				components: {
					illustration: renderToString(<Illustration/>),
					header: renderToString(<Header/>),
					navigation: renderToString(<Navigation/>),
					content: renderToString(<Content saveData={false}/>)
				}
			};

			if(typeof metadata.canonical === "string"){
				htmlOpts = Object.assign(htmlOpts, {
					canonical: metadata.canonical
				});
			}

			markupOutputs.push(new HtmlWebpackPlugin(htmlOpts));
			markupOutputs.push(new HtmlWebpackPlugin(Object.assign(htmlOpts, {
				filename: path.join(routes.replace("src/routes", "dist"), "index.savedata.html"),
				saveData: true,
				components: {
					illustration: renderToString(<Illustration/>),
					header: renderToString(<Header/>),
					navigation: renderToString(<Navigation/>),
					content: renderToString(<Content saveData={true}/>)
				}
			})));
		}

		if(fs.lstatSync(path.join(routes, route)).isDirectory() === true){
			buildRoutes(path.join(routes, route));
		}
	});
}

buildRoutes(path.join(__dirname, "src", "routes"));

markupOutputs.push(new HtmlWebpackPlugin(Object.assign(xmlOutputOptions, {
	filename: path.join(webRoot, "rss.xml"),
	title: "Jeremy Wagner's Web Development Blog",
	components: {
		content: RSSFeed
	},
	xhtml: true
})));
markupOutputs.push(new HtmlWebpackPlugin(Object.assign(xmlOutputOptions, {
	filename: path.join(webRoot, "sitemap.xml"),
	components: {
		content: renderToString(<Sitemap/>)
	},
	xhtml: true
})));

module.exports = {
	entry: entryPoints,
	output: {
		filename: "js/[name].[chunkhash:8].js",
		path: webRoot,
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
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
		new ImageminPlugin({
			svgo: {
				multipass: true,
				precision: 2
			}
		}),
		...markupOutputs,
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
			}
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
		new ManifestWebpackPlugin({
			publicPath: "/",
			fileName: "assets.json"
		})
	]
};
