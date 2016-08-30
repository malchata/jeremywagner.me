// Get gulp packages
var gulp = require("gulp"),
	util = require("gulp-util"),
	plumber = require("gulp-plumber"),
	livereload = require("gulp-livereload"),
	del = require("del"),
	changed = require("gulp-changed"),
	less = require("gulp-less"),
	postcss = require("gulp-postcss"),
	autoprefixer = require("autoprefixer"),
	autorem = require("autorem"),
	cssnano = require("cssnano"),
	data = require("gulp-data"),
	nunjucks = require("gulp-nunjucks"),
	htmlmin = require("gulp-htmlmin"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	imagemin = require("gulp-imagemin"),
	extReplace = require("gulp-ext-replace"),
	jpegRecompress = require("imagemin-jpeg-recompress"),
	pngQuant = require("imagemin-pngquant"),
	svgo = require("imagemin-svgo"),
	webp = require("imagemin-webp"),
	fs = require("fs");

/**
 * UTILITY TASKS
 **/

// Watch task
gulp.task("default", function(){
	// Reload automatically on changes
	livereload.listen();

	// Watches
	gulp.watch("src/less/**/*.less", ["build-css"]);
	gulp.watch(["src/**/*.html", "src/**/*.json"], ["htmlmin"]);
	gulp.watch("src/js/**/*.js", ["concat"]);
	gulp.watch("src/img/**", ["imagemin"]);
	gulp.watch("src/*.png", ["imagemin-favicon"]);
});

// clean
gulp.task("clean", function(){
	return del(["dist"]);
});

// build
gulp.task("build", ["build-css", "htmlmin", "concat", "imagemin", "imagemin-favicon"]);

/**
 * CSS BUILDING TASK
 **/

gulp.task("build-css", function(){
	var src = ["src/less/global.less", "src/less/fonts-loaded.less"],
		dest = "dist/css";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(less().on("error", function(err){
			util.log(err);
			this.emit("end");
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 4 versions"]
			}), autorem(), cssnano()
		]))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

/**
 * HTML-RELATED TASKS
 **/

// nunjucks
gulp.task("nunjucks", function(){
	var src = ["src/**/*.html", "!src/partials/*.html"],
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(data(function(file){
			try{
				var jsonFile = file.path.replace(".html", ".json");
				return JSON.parse(fs.readFileSync(jsonFile));
			}
			catch(e){
				return false;
			}
		}))
		.pipe(nunjucks.compile())
		.pipe(gulp.dest(dest));
});

// htmlmin
gulp.task("htmlmin", ["nunjucks"], function(){
	var src = "dist/**/*.html",
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

/**
 * JAVASCRIPT-RELATED TASKS
 **/

// uglify
gulp.task("uglify", function(){
	var src = "src/js/**/*.js",
		dest = "dist/js";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(uglify())
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

// Concatenation
gulp.task("concat", ["uglify"], function(){
	var src = [
			"dist/**/*.js",
			"!dist/js/scripts.js",
			"!dist/js/ga.js",
			"!dist/js/load-fonts.js",
			"!dist/js/fontfaceobserver.js",
			"!dist/js/sw-install.js",
			"!dist/js/sw.js",
			"!dist/js/caches.js"
		],
		dest = "dist/js";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(concat("scripts.js"))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

/**
 * IMAGE PROCESSING TASKS
 **/

// imagemin
gulp.task("imagemin", ["imagemin-webp"], function(){
	var src = "src/img/**/*.{jpg,png,gif,svg}",
		dest = "dist/img";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(imagemin([
			jpegRecompress({
				max: 90
			}),
			pngQuant({
				quality: "45-90"
			}),
			svgo()
		]))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

// imagemin - webp
gulp.task("imagemin-webp", function(){
	var src = "src/img/**/*.{jpg,png}",
		dest = "dist/img";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(imagemin([
				webp({
					quality: 65
				})
			]
		))
		.pipe(extReplace(".webp"))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

// imagemin - favicons
gulp.task("imagemin-favicon", function(){
	var src = "src/*.png",
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(imagemin([
			jpegRecompress({
				max: 90
			}),
			pngQuant({
				quality: "45-90"
			}),
			svgo()
		]))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});