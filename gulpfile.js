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
	nunjucks = require("gulp-nunjucks"),
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
	gulp.watch("dist/css/global.css", ["postcss"]);
	gulp.watch("src/**/*.html", ["nunjucks"]);
	gulp.watch("dist/**/*.html", ["htmlmin"]);
	gulp.watch("src/js/**/*.js", ["uglify"]);
	gulp.watch(["dist/js/**/*.js", "!dist/js/scripts.js"], ["concat"]);
	gulp.watch("src/img/**", ["imagemin"]);
});

// Build Task
gulp.task("default", ["less", "postcss", "nunjucks", "htmlmin", "uglify", "imagemin"]);

// LESS Compilation
gulp.task("less", function(){
	return gulp.src("src/less/global.less").pipe(less({
		plugins: [cleancss]
	})).pipe(gulp.dest("dist/css")).pipe(livereload());
});

// postcss
gulp.task("postcss", ["less"], function(){
	var processors = [
		autoprefixer({
			browsers: ["last 4 versions"]
		}), autorem()
	];

	return gulp.src("dist/css/*.css").pipe(postcss(processors)).pipe(gulp.dest("dist/css")).pipe(livereload());
});

// Nunjucks Templating
gulp.task("nunjucks", function(){
	return gulp.src(["src/**/*.html", "!src/partials/**"]).pipe(nunjucks.compile()).pipe(gulp.dest("dist")).pipe(livereload());
});

// HTML Minification
gulp.task("htmlmin", ["nunjucks"], function(){
	return gulp.src("dist/**/*.html").pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	})).pipe(gulp.dest("dist")).pipe(livereload());
});

// Uglification
gulp.task("uglify", function(){
	return gulp.src("src/js/**/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
});

// Concatenation
gulp.task("concat", ["uglify"], function(){
	return gulp.src(["dist/js/nav.js", "dist/js/lazyload.js"]).pipe(concat("scripts.js")).pipe(gulp.dest("dist/js")).pipe(livereload());
});

// Imagemin
gulp.task("imagemin", function(){
	gulp.src("src/img/**").pipe(imagemin()).pipe(gulp.dest("dist/img")).pipe(livereload());
});