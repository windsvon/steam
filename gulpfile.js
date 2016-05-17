var gulp = require('gulp');
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

var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

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

gulp.task('script', [], function () {
    gulp.src('src/script/**.coffee')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/script'));
});

gulp.task('style', [], function () {
    gulp.src(['src/style/**.styl'])
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(stylus())
        // .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/style'));
    gulp.src(['src/style/ie/**.styl'])
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(stylus())
        // .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
        .pipe(sourcemaps.write('.'))
        .pipe(concat('app.ie.css'))
        .pipe(gulp.dest('dist/style'));
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

gulp.task('default', ["html", 'script', 'style', 'image', 'lib', 'resource']);