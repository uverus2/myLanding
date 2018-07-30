var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var cache = require('gulp-cache');


gulp.task('default', ['sass', 'watch', 'images', 'minify',  'concatJS']);

gulp.task('default', ['sass', 'images', 'minify',  'concatJS'], function() {
    // watch for CSS changes
    gulp.watch('src/**/*', function() {
        // run styles upon changes
        gulp.run(['sass', 'concatJS']);
    });
});


gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/'));
});

gulp.task('concatJS', function() {
    return gulp.src([
            //'node_modules/jquery/dist/jquery.js',
            
            'src/js/**/*.js'
        ])
        .pipe(concat('app.js')) 
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify', function() {
    return gulp.src('dist/app.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
});


gulp.task('images', function() {
    return gulp.src('images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('dist/images'));
});