import fs from "fs";
import path from "path";
import webpack from "webpack";
import ImageminPlugin from "imagemin-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import InlineChunkManifestHtmlWebpackPlugin from "inline-chunk-manifest-html-webpack-plugin";
import WebpackManifestPlugin from "webpack-manifest-plugin";
import { h } from "preact";
import renderToString from "preact-render-to-string";
const { render } = renderToString;

// These are global component definitions
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

const components = {
	header: Header,
	navigation: Navigation
};
const exclusions = /node_modules/i;
const htmlTemplate = path.join(__dirname, "src/html/template.html");
const webRoot = path.join(__dirname, "dist");
const routes = path.join(__dirname, "src", "routes");

let htmlOutputs = [
	new HtmlWebpackPlugin({
		template: htmlTemplate,
		filename: path.join(webRoot, "index.html"),
		inject: false,
		hash: false,
		chunks: ["index"],
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true
		},
		blogPost: false,
		title: "Home",
		render(component, props){
			let vnode = h(components[component], props);
			return renderToString(vnode);
		}
	})
];

let entryPoints = {
	"vendors": ["preact", "preact-router", "preact-async-route"],
	"index": "./src/index.js"
}

fs.readdirSync(routes).forEach((route)=>{
	let metadata = require(path.resolve(path.join(routes, route, "index.js"))).Metadata;
	components.content = require(path.resolve(path.join(routes, route, "index.js"))).default;
	entryPoints[route] = path.resolve(path.join(routes, route, "index.js"));

	htmlOutputs.push(new HtmlWebpackPlugin({
		template: htmlTemplate,
		filename: path.join(webRoot, "blog", route, "index.html"),
		inject: false,
		hash: false,
		chunks: ["index"],
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true
		},
		blogPost: true,
		title: metadata.title,
		render(component, props){
			let vnode = h(components[component], props);
			return renderToString(vnode);
		}
	}));
});

module.exports = {
	entry: entryPoints,
	target: "web",
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
					use: ["css-loader", "postcss-loader"]
				})
			},
			{
				test: /\.(png|gif|jpe?g|svg)$/,
				exclude: exclusions,
				use: "file-loader?name=images/[name].[hash:8].[ext]"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(webRoot),
		...htmlOutputs,
		new ImageminPlugin({
			svgo: {
				multipass: true,
				precision: 1
			}
		}),
		new ExtractTextPlugin("css/styles.[chunkhash:8].css"),
		new webpack.optimize.CommonsChunkPlugin({
			names: ["vendors", "runtime", "manifest"],
			minChunks: Infinity
		}),
		new InlineChunkManifestHtmlWebpackPlugin({
			dropAsset: true,
			// manifestPlugins: [
			// 	new WebpackManifestPlugin()
			// ],
			manifestVariable: "manifest"
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};
