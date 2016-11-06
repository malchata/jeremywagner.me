// Get gulp packages
const gulp = require("gulp"),
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
	  uncss = require("gulp-uncss"),
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
	  fs = require("fs"),
	  path = require("path");

/**
 * UTILITY TASKS
 **/

// Watch task
gulp.task("default", () => {
	// Reload automatically on changes
	livereload.listen();

	// Watches
	gulp.watch("src/less/**/*.less", ["uncss"]);
	gulp.watch(["src/**/*.html", "src/**/*.json", "src/**/*.content"], ["htmlmin"]);
	gulp.watch("src/js/**/*.js", ["concat"]);
	gulp.watch("src/img/**", ["imagemin"]);
	gulp.watch("src/*.png", ["imagemin-favicon"]);
});

// clean
gulp.task("clean", () => {
	return del(["dist"]);
});

// build
gulp.task("build", ["uncss", "htmlmin", "concat", "imagemin", "imagemin-favicon", "copy-files"]);

/**
 * CSS BUILDING TASK
 **/

gulp.task("build-css", () => {
	let src = ["src/less/global.less", "src/less/fonts-loaded.less", "src/less/http1.less", "src/less/amp.less"],
		dest = "dist/css";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(less().on("error", (err) => {
			util.log(err);
			this.emit("end");
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 3 versions"]
			}), autorem(), cssnano()
		]))
		.pipe(gulp.dest(dest));
});

gulp.task("uncss", ["build-css"], () => {
	let src = "dist/css/global.css",
		dest = "dist/css",
		pages = [
			"dist/*.html",
			"dist/blog/*.html"
		];

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(uncss({
			html: pages
		}))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

gulp.task("uncss-amp", () => {
	let src = "dist/css/amp.css",
		dest = "dist/css",
		pages = [
			"dist/blog/amp/*.html"
		];

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(uncss({
			html: pages
		}))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

/**
 * HTML-RELATED TASKS
 **/

// nunjucks
gulp.task("nunjucks", () => {
	let src = ["src/**/*.html", "!src/partials/**/*.html"],
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(data((file) =>{
			try{
				let jsonContent = path.basename(file.path, ".html") + ".json",
					fileArray = jsonContent.split("/");

				if(file.path.indexOf("/blog/") !== -1){
					filePath = path.resolve(path.join("./src/blog/metadata/", fileArray[fileArray.length - 1]))
				}
				else{
					filePath = path.resolve(path.join("./src/metadata/", fileArray[fileArray.length - 1]))
				}

				return JSON.parse(fs.readFileSync(filePath));
			}
			catch(e){
				return false;
			}
		}))
		.pipe(nunjucks.compile())
		.pipe(gulp.dest(dest));
});

// htmlmin
gulp.task("htmlmin", ["nunjucks"], () => {
	let src = "dist/**/*.html",
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
gulp.task("uglify", () => {
	let src = "src/js/**/*.js",
		dest = "dist/js";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(uglify())
		.pipe(gulp.dest(dest))
		.pipe(livereload());
});

// Concatenation
gulp.task("concat", ["uglify"], () => {
	let src = [
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
gulp.task("imagemin", ["imagemin-webp"], () => {
	let src = "src/img/**/*.{jpg,png,gif,svg}",
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
gulp.task("imagemin-webp", () => {
	let src = "src/img/**/*.{jpg,png}",
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
gulp.task("imagemin-favicon", () => {
	let src = "src/*.png",
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

// Copy files
gulp.task("copy-files", () => {
	let src = ["src/robots.txt", "src/*.ico", "src/google7b88ad726109dad3.html"],
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
});