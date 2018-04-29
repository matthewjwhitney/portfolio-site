var gulp = require("gulp"),
	browserSync = require("browser-sync").create(),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	jasmine = require("gulp-jasmine-phantom"),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
	imagemin = require("gulp-imagemin");

gulp.task("default", ["styles", "copy-html", "copy-img", "scripts", "browser-sync", "watch"], function(){
});

gulp.task("watch", ["browser-sync"], function() {

	gulp.watch("src/img/*", ["copy-img", browserSync.reload]);
	gulp.watch("src/index.html", ["copy-html", browserSync.reload]);
	gulp.watch("src/sass/**/*.scss", ["styles", browserSync.reload]);
	gulp.watch("src/js/**/*.js", ["scripts", browserSync.reload]);
});

gulp.task("browser-sync", function(){
	browserSync.init({
		server: {
			baseDir: "dist/"
		}
	});
});

gulp.task("styles", function () {
	return gulp.src("src/sass/**/*.scss")
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(gulp.dest("dist/css"));
});

gulp.task("copy-html", function() {
	return gulp.src("src/index.html")
		.pipe(gulp.dest("./dist"));

});

gulp.task("scripts", function() {
	return gulp.src("src/js/**/*.js")
		.pipe(babel())
		.pipe(sourcemaps.init())
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("dist/js"));
});

gulp.task("copy-img", function() {
	return gulp.src("src/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img"));
});

gulp.task("tests", function() {
	gulp.src("tests/spec/extraSpec.js")
		.pipe(jasmine({
			integration: true,
			vendor: "src/js/**/*.js"
		}));
});
