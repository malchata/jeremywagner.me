module.exports = {
	plugins: [
		require("postcss-easy-import"),
		require("postcss-css-variables"),
		require("autoprefixer"),
		require("autorem")({
			browsers: ["last 2 versions", "> 5%", "ie >= 10", "iOS >= 8"]
		}),
		require("cssnano")
	]
};
