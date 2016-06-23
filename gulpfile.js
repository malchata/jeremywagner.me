// Get gulp packages
var gulp = require("gulp"),
	gulpUtil = require("gulp-util"),
	plumber = require("gulp-plumber"),
	livereload = require("gulp-livereload"),
	less = require("gulp-less"),
	cleancssPlugin = require("less-plugin-clean-css"),
	cleancss = new cleancssPlugin(),
	postcss = require("gulp-postcss"),
	autoprefixer = require("autoprefixer"),
	autorem = require("autorem"),
	htmlmin = require("gulp-htmlmin"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin");

// Watch task
gulp.task("watch", function(){
	// Reload automatically on changes
	livereload.listen();

	// Watches
	gulp.watch("src/less/**/*.less", ["less"]);
	gulp.watch("dist/css/main.css", ["postcss"]);
	gulp.watch("src/**/*.html", ["htmlmin"]);
	gulp.watch("src/js/**/*.js", ["uglify"]);
	gulp.watch("dist/js/**/*.js", ["concat"]);
	gulp.watch("src/img/**", ["imagemin"]);
});

// Build task
gulp.task("build", ["less", "postcss", "htmlmin", "uglify", "imagemin"]);

// LESS compilation
gulp.task("less", function(){
	return gulp.src("src/less/global.less").pipe(plumber()).pipe(less({
		plugins: [cleancss]
	})).pipe(gulp.dest("dist/css")).pipe(livereload());
});

// postcss
gulp.task("postcss", function(){
	var processors = [
		autoprefixer({
			browsers: ["last 4 versions"]
		}), autorem()
	];

	return gulp.src("dist/css/*.css").pipe(plumber()).pipe(postcss(processors)).pipe(gulp.dest("dist/css")).pipe(livereload());
});

// HTML minification
gulp.task("htmlmin", function(){
	return gulp.src("src/**/*.html").pipe(plumber()).pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	})).pipe(gulp.dest("dist")).pipe(livereload());
});

// Uglification
gulp.task("uglify", function(){
	return gulp.src("src/js/**/*.js").pipe(plumber()).pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Concatenation
gulp.task("concat", function(){
	return gulp.src(["dist/js/lazyload.js"]).pipe(concat("scripts.js")).pipe(gulp.dest("dist/js"));
});

// Imagemin
gulp.task("imagemin", function(){
	gulp.src("src/img/**").pipe(plumber()).pipe(imagemin()).pipe(gulp.dest("dist/img")).pipe(livereload());
});