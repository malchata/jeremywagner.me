import fs from "fs";
import path from "path";
import webpack from "webpack";
import ImageminPlugin from "imagemin-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import { h } from "preact";
import renderToString from "preact-render-to-string";

// These are global component definitions
import Illustration from "./src/components/Illustration";
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

const exclusions = /node_modules/i;
const webRoot = path.join(__dirname, "dist");

let components = {
	illustration: Illustration,
	header: Header,
	navigation: Navigation
};
let entryPoints = {
	"styles": "./src/css/styles.css",
	"yall": "./src/js/yall.js"
};
let htmlOutputs = [];

function buildRoutes(routes){
	fs.readdirSync(routes).forEach((route)=>{
		if(route.indexOf("index.js") !== -1){
			let routeModule = require(path.join(routes, route));
			let metadata = routeModule.Metadata;
			components.content = routeModule.default;

			let routeParts = routes.split(path.sep);
			let entryPointName = routeParts[routeParts.length - 1] === "routes" ? "index" : routeParts[routeParts.length - 1];
			entryPoints[entryPointName] = path.join(routes, route);

			htmlOutputs.push(new HtmlWebpackPlugin({
				template: path.join(__dirname, "src/html/template.html"),
				filename: path.join(routes.replace("src/routes", "dist"), "index.html"),
				inject: false,
				hash: false,
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					minifyJS: true
				},
				chunks: ["styles", "yall", entryPointName],
				title: metadata.title,
				description: metadata.description,
				render: function(component, props){
					let vnode = h(components[component], props);
					return renderToString(vnode);
				}
			}));
		}

		if(fs.lstatSync(path.join(routes, route)).isDirectory() === true){
			buildRoutes(path.join(routes, route));
		}
	});
}

buildRoutes(path.join(__dirname, "src", "routes"));

module.exports = {
	entry: entryPoints,
	output: {
		filename: "js/[name].[chunkhash].js",
		path: webRoot,
		publicPath: "/",
		hashDigestLength: 8
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
					use: ["css-loader", "postcss-loader"]
				})
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/,
				exclude: exclusions,
				use: "file-loader?name=images/[name].[ext]"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(webRoot),
		new ExtractTextPlugin("css/styles.[contenthash:8].css"),
		new ImageminPlugin({
			svgo: {
				multipass: true,
				precision: 1
			}
		}),
		...htmlOutputs,
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: ["runtime"]
		}),
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		})
	]
};
