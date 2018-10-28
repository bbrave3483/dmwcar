var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templatecache = require('gulp-angular-templatecache');
var cleancss = require('gulp-clean-css');
var sequence = require('run-sequence');

gulp.task('clean', function() {
    // Option read:false prevents gulp from reading the contents of the file and makes this task a lot faster.
    return gulp.src('dist/*', {read:false})
        .pipe(clean());
});

gulp.task('copyResource', function() {
    return gulp.src(['app/index.html', 'app/static/images/**/*'], {base:'app'})
        .pipe(gulp.dest('dist', {mode:0644}));
});

gulp.task('buildJs', function() {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('app.uncompress.js'))
        .pipe(annotate())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/static/js', {mode:0644}));
});

gulp.task('buildTemplate', function() {
    return gulp.src(['app/**/*.html', '!app/index.html'])
        .pipe(templatecache('template.js', {module:'app'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js', {mode:0644}))
});

gulp.task('buildCss', function() {
    return gulp.src('app/static/css/*.css')
        .pipe(concat('app.min.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/static/css', {mode:0644}))
});

gulp.task('release', function(done) {
    sequence('clean', 'copyResource', 'buildJs', 'buildTemplate', 'buildCss', done);
});

gulp.task('default', function() {
    console.log('no task');
});
