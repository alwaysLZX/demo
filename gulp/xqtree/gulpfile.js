var gulp = require("gulp");
var browserSync = require("browser-sync");
var plugins = require('gulp-load-plugins')();

gulp.task("build:less", function () {
    gulp.src("src/*.less")
        .pipe(plugins.less())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("build:js", function () {
    gulp.src("src/*.js")
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("build:html", function () {
    gulp.src("src/*.html")
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.minifyHtml())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task("watch", function () {
    gulp.watch("src/*.html", ['build:html']);
    gulp.watch("src/*.js", ['build:js']);
    gulp.watch("src/*.less", ['build:less']);
});

gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        port: 12,
        open: 'external',
        host: 'localhost'
    });
});

gulp.task("release", ["build:html", "build:js", "build:less"]);

gulp.task("default", ["release", "server", "watch"]);
