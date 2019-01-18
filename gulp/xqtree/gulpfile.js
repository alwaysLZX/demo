var gulp = require("gulp");
var browserSync = require("browser-sync");
var plugins = require('gulp-load-plugins')();

gulp.task("dev:html", function () {
    gulp.src("src/*.html")
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["dev:html"], function () {
    browserSync.init({
        server: {
            baseDir: "src"
        },
        port: 12,
        open: 'external',
        host: 'localhost'
    });

    gulp.watch(["src/*.html", "src/*.js", "src/*.scss"]).on('change', function () {
        browserSync.reload();
    });
});
