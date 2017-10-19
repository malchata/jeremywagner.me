module.exports = {
	plugins: [
		require("postcss-easy-import"),
		require("postcss-media-variables"),
		require("postcss-css-variables"),
		require("autorem"),
		require("autoprefixer")({
			browsers: ["last 2 versions", "> 5%", "ie >= 10", "iOS >= 8"]
		}),
		require("cssnano")
	]
};
