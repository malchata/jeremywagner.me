import path from "path";
import ImageminPlugin from "imagemin-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import renderToString from "preact-render-to-string";
import { h } from "preact";

// These are components
import Header from "./src/components/Header";
import Navigation from "./src/components/Navigation";

const components = {
	header: Header,
	navigation: Navigation
};

const exclusions = /node_modules/i;

const webTarget = {
	entry: "./src/index.js",
	target: "web",
	output: {
		filename: "js/index.[hash:8].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader"
			},
			{
				test: /\.scss$/,
				exclude: exclusions,
				use: ExtractTextPlugin.extract({
					use: ["css-loader", "postcss-loader", "sass-loader"]
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
		new HtmlWebpackPlugin({
			template: "src/html/template.html",
			inject: false,
			hash: false,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				minifyJS: true
			},
			title: "Home",
			render(component, props){
				let vnode = h(components[component], props);
				return renderToString(vnode);
			}
		}),
		new ImageminPlugin({
			svgo: {
				multipass: true,
				precision: 1
			}
		}),
		new ExtractTextPlugin("css/styles.[hash:8].css"),
		new webpack.optimize.UglifyJsPlugin()
	]
}

module.exports = [webTarget];
