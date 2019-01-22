var gulp = require("gulp");
var browserSync = require("browser-sync");
var plugins = require('gulp-load-plugins')();

var option = {
    base: 'src'
};
var dist = __dirname + '/dist';

gulp.task("build:less", function () {
    gulp.src("src/*.less", option)
        .pipe(plugins.less())
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("build:js", function () {
    gulp.src("src/*.js", option)
        .pipe(plugins.babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("build:html", function () {
    gulp.src("src/*.html", option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(plugins.minifyHtml())
        .pipe(plugins.rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("build:asset", function () {
    gulp
        .src('src/images/**/*.?(png|jpg|gif)', option)
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", function () {
    gulp.watch('src/images/**/*.?(png|jpg|gif)', ['build:asset']);
    gulp.watch("src/*.less", ['build:less']);
    gulp.watch("src/*.js", ['build:js']);
    gulp.watch("src/*.html", ['build:html']);
});

gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 12,
        open: 'external',
        host: 'localhost'
    });
});

gulp.task("release", ["build:asset", "build:less", "build:js", "build:html"]);

gulp.task("default", ["release", "server", "watch"]);
