var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var minifyCss = require('gulp-minify-css');
var shell = require('gulp-shell');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: "./",
    port: 3002
  });

  gulp.watch("./src/sass/*.scss", ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task('doc', shell.task([
  './node_modules/jsdoc/jsdoc.js src/js/ ./README.md -d ./doc'
]));

gulp.task('build', ['sass'], function () {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['serve']);
