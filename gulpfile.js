// Get gulp packages
const gulp = require("gulp");
const util = require("gulp-util");
const plumber = require("gulp-plumber");
const livereload = require("gulp-livereload");
const del = require("del");
const changed = require("gulp-changed");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const autorem = require("autorem");
const cssnano = require("cssnano");
const data = require("gulp-data");
const nunjucks = require("gulp-nunjucks");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const optimizeJS = require("gulp-optimize-js");
const imagemin = require("gulp-imagemin");
const extReplace = require("gulp-ext-replace");
const jpegRecompress = require("imagemin-jpeg-recompress");
const pngQuant = require("imagemin-pngquant");
const webp = require("imagemin-webp");
const fs = require("fs");
const path = require("path");

/*** CSS build task ***/
const buildCSS = ()=>{
	let src = ["src/less/global.less", "src/less/fonts-loaded.less", "src/less/http1.less", "src/less/amp.less"],
		dest = "dist/css";

	return gulp.src(src)
		.pipe(changed(dest))
		.pipe(less().on("error", (err)=>{
			util.log(err);
			this.emit("end");
		}))
		.pipe(postcss([
			autoprefixer({
				browsers: ["last 3 versions"]
			}), autorem(), cssnano({
				safe: true
			})
		]))
		.pipe(gulp.dest(dest));
};

exports.buildCSS = buildCSS;

/*** HTML tasks ***/
const buildHTML = ()=>{
	let src = "src/**/*.html",
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(data((file)=>{
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
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest(dest));
};

exports.buildHTML = buildHTML;

/*** JavaScript tasks ***/
const buildJS = ()=>{
	let src = "src/js/**/*.js",
		dest = "dist/js";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(uglify())
		.pipe(optimizeJS())
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};

const concatJS = ()=>{
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
};

exports.buildJS = buildJS;
exports.concatJS = concatJS;

/*** Image optimization tasks ***/
const optimizeImages = ()=>{
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
			})
		]))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};

const generateWebpImages = ()=>{
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
};

// imagemin - favicons
const createFavicons = ()=>{
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
			})
		]))
		.pipe(gulp.dest(dest))
		.pipe(livereload());
};

exports.optimizeImages = optimizeImages;
exports.generateWebpImages = generateWebpImages;
exports.createFavicons = createFavicons;

// Copy files
const copyFiles = ()=>{
	let src = ["src/robots.txt", "src/*.ico", "src/google7b88ad726109dad3.html"],
		dest = "dist";

	return gulp.src(src)
		.pipe(plumber())
		.pipe(changed(dest))
		.pipe(gulp.dest(dest));
};

exports.copyFiles = copyFiles;

/*** Utility Tasks ***/
const watch = ()=>{
	livereload.listen();

	gulp.watch("src/less/**/*.less", buildCSS);
	gulp.watch(["src/**/*.html", "src/**/*.json", "src/**/*.content"], buildHTML);
	gulp.watch("src/js/**/*.js", gulp.series(buildJS, concatJS));
	gulp.watch("src/img/**", gulp.parallel(optimizeImages, generateWebpImages));
	gulp.watch("src/*.png", createFavicons);
};

// clean
const clean = ()=>{
	return del("dist");
};

// build
const build = gulp.series(clean, gulp.parallel(buildCSS, buildHTML, gulp.series(buildJS, concatJS), optimizeImages, generateWebpImages, createFavicons, copyFiles));

exports.default = watch;
exports.clean = clean;
exports.build = build;