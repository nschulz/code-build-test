/* File: gulpfile.js */

// grab our gulp packages
var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    less    = require('gulp-less'),
    clean   = require('gulp-clean-css'),
    jade    = require('gulp-jade'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    pump    = require('pump'),
    path    = require('path');

// compile less files from public/.../less into public/.../css
gulp.task('less', function () {
    return gulp.src('./assets/less/main.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(clean({}))
        .pipe(gulp.dest('./assets/css'));
});

// compile jade files from public/.../jade to public/.../templates
// also compiles index.jade
gulp.task('templates', function () {
    gulp.src('./index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./'));
        
    return gulp.src('./views/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./templates'));
});

// compile javascript files from public/.../scripts to public/.../js
gulp.task('compress', function () {
    gulp.src('./assets/scripts/**/*.js')
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./assets/js'));
});

// run all the tasks
// gulp.task('build', ['less', 'templates', 'compress'], function () {
gulp.task('build', ['templates'], function () {
    return gutil.log('Finished!');
});

// create a default task to build the application
gulp.task('default', ['build'], function () {
    ;
});