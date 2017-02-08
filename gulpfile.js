var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');
var beep = require('beepbeep');

var concat = require('gulp-concat');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var declare = require('gulp-declare');
var _ = require('lodash');
var minifyCss = require('gulp-minify-css');
var babel = require('gulp-babel');
var es3ify = require('gulp-es3ify');

var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var webpack = require('webpack-stream');
var named = require('vinyl-named');

var webpackConfig = require('./webpack.config');
var webpackBootstrapConfig = require('./webpack.bootstrap.config');

var browserSync = require('browser-sync').create();


function errorHandler(err) {
    beep(2);
    console.error(err.toString());
}

// function relativePaths(parentPath, paths) {
//     return _.map(paths, function (p) {
//         return parentPath + p
//     });
// }

// function coffeeScript(srcPaths, concatFile, destPath) {
//     var p = gulp.src(srcPaths)
//         .pipe(plumber({errorHandler: errorHandler}))
//         .pipe(sourcemaps.init())
//         .pipe(coffee())
//         // .pipe(uglify());
//     p = concatFile && p.pipe(concat(concatFile)) || p;
//     p.pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(destPath));
// }

gulp.task("html", function () {
    gulp.src('html/**.jade')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(jade({client: false, pretty: true}))
        .pipe(gulp.dest('dist'));
});

// gulp.task('script', [], function () {
//     gulp.src('src/script/**.coffee')
//         .pipe(plumber({errorHandler: errorHandler}))
//         .pipe(sourcemaps.init())
//         .pipe(coffee())
//         .pipe(babel())
//         .pipe(uglify())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('dist/script'));
// });


gulp.task('script', [], function () {
    gulp.src(['src/script/**.js', 'src/script/**.coffee'])
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/script'))
        .pipe(browserSync.stream());
});

gulp.task('bootstrap', [], function () {
    gulp.src('bootstrap.bundle.coffee')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(named())
        .pipe(webpack(webpackBootstrapConfig))
        .pipe(gulp.dest('dist/lib'))
        .pipe(browserSync.stream());
});
//
// gulp.task("webpack", function(callback) {
//     // run webpack
//     webpack(webpackConfig, function(err, stats) {
//         if(err) throw new gutil.PluginError("webpack", err);
//         gutil.log("[webpack]", stats.toString({
//             // output options
//         }));
//         callback();
//     });
// });



gulp.task('style', [], function () {
    var themes = ["dark", "light"];

    themes.forEach(function (theme) {
        gulp.src(['src/style/**.styl'])
            .pipe(plumber({errorHandler: errorHandler}))
            .pipe(stylus({
                rawDefine: {
                    theme: theme
                }
            }))
            // .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/style/' + theme));
        gulp.src(['src/style/ie/**.styl'])
            .pipe(plumber({errorHandler: errorHandler}))
            .pipe(stylus({
                rawDefine: {
                    theme: theme
                }
            }))
            // .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
            .pipe(sourcemaps.write('.'))
            .pipe(concat('app.ie.css'))
            .pipe(gulp.dest('dist/style/' + theme));
    });

});



gulp.task('image', [], function () {
    gulp.src('src/img/**')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('lib', [], function () {
    gulp.src('lib/**')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('resource', [], function () {
    gulp.src('src/resource/**')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest('dist/r'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch('html/**', ['html']);
    gulp.watch('src/script/**', ['script']);
    gulp.watch('src/style/**', ['style']);
    gulp.watch('src/img/**', ['image']);
    gulp.watch('lib/**', ['lib']);
    gulp.watch('src/resource/**', ['resource']);

});

gulp.task('serve', [], function() {
    browserSync.init({
        // proxy: "localhost:7081"
        server: "./dist/"

    });
    gulp.watch('./dist/**').on('change', browserSync.reload)
});

gulp.task('default', ["html", 'style', 'image', 'lib', 'resource', 'script']);