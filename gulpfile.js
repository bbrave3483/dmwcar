const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const templatecache = require('gulp-angular-templatecache');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const annotate = require('gulp-ng-annotate');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');
const rev = require('gulp-rev');
const rewrite = require('gulp-rev-rewrite');

function cleanDist() {
    // Option read:false prevents gulp from reading the contents of the file and makes this task a lot faster.
    return src(['dist/*', 'app/rev/*'], {read:false})
        .pipe(clean());
}

function copyHtml() {
    return src('app/index.html')
        .pipe(dest('dist', {mode:0644}));
}

function copyImage() {
    return src('app/static/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/static/images'), {mode:0644});
}

function buildTemplate() {
    return src(['app/**/*.html', '!app/index.html'])
        .pipe(templatecache('template.js', {module:'app'}))
        .pipe(uglify())
        .pipe(dest('app/rev/js', {mode:0644}));
}

function buildJs() {
    return src(['app/**/*.js', '!app/rev/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('app-uncompress.js'))
        .pipe(annotate())
        .pipe(uglify())
        .pipe(rename('app-min.js'))
        .pipe(dest('app/rev/js', {mode:0644}));
}

function buildCss() {
    return src('app/static/css/*.css')
        .pipe(concat('app-min.css'))
        .pipe(cleancss())
        .pipe(dest('app/rev/css', {mode:0644}));
}

function createRev() {
    return src(['app/rev/css/*.css', 'app/rev/js/*.js'], {base: 'app/rev'})
        .pipe(rev())
        .pipe(dest('dist/static'))
        .pipe(rev.manifest())
        .pipe(dest('app/rev'));
}

function updateRev() {
    const manifest = src('app/rev/rev-manifest.json');
    return src('dist/index.html')
        .pipe(rewrite({manifest}))
        .pipe(dest('dist'));
}

exports.default = cleanDist;
exports.build = series(cleanDist, copyHtml, copyImage, buildTemplate, buildJs, buildCss, createRev, updateRev);;
