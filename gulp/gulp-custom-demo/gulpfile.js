var gulp = require("gulp");
var browserSync = require("browser-sync");
var plugins = require('gulp-load-plugins')();

var option = {
    base: 'src'
};
var dist = __dirname + '/dist';

var banner = [
    '/*!',
    ' * xqTree v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> xieqian.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
  ].join('\n');

gulp.task("build:less", function () {
    gulp.src("src/*.less", option)
        .pipe(plugins.less())
        .pipe(plugins.rename(function (path) {
            if (path.basename === "index") {
                path.basename = 'xqtree';
            }
        }))
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
        .pipe(plugins.rename(function (path) {
            if (path.basename === "index") {
                path.basename = 'xqtree';
            }
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
        .pipe(plugins.rename(function (path) {
            if (path.basename === "index") {
                path.basename = 'xqtree';
            }
        }))
        .pipe(plugins.tap(function (file) {
            var contents = file.contents.toString();
            contents = contents.replace(
              /<link\s+rel="stylesheet"\s+href="(index.css)"\s+\/>/gi,
              function() {
                return ('<link rel="stylesheet" href="xqtree.css"/>');
              }
            );
            contents = contents.replace(
                /<script\s+src="(index.js)"><\/script>/gi,
                function() {
                  return ('<script src="xqtree.js"></script>');
                }
              );
            file.contents = new Buffer(contents);
        }))
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
        .src('src/images/**/*.?(png|jpg|gif|ico)', option)
        .pipe(plugins.rename(function (path) {
            if (path.basename === "favicon" && path.extname === ".ico") {
                path.dirname = "";
            }
        }))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("watch", function () {
    gulp.watch('src/images/**/*.?(png|jpg|gif|ico)', ['build:asset']);
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
        host: 'localhost',
        index: "xqtree.html"
    });
});

gulp.task("release", ["build:asset", "build:less", "build:js", "build:html"]);

gulp.task("default", ["release", "server", "watch"]);
