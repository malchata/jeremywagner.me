module.exports = {
	plugins: [
		require("postcss-easy-import"),
		require("postcss-css-variables"),
		require("autorem"),
		require("autoprefixer")({
			browsers: ["last 3 versions", "> 2.5%", "ie >= 11", "iOS >= 9"]
		}),
		require("cssnano")
	]
};
