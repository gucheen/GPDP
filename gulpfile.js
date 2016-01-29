var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var shell = require('gulp-shell');
var ts = require('gulp-typescript');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

  browserSync.init({
    server: './',
    port: 3002
  });

  gulp.watch('./src/sass/*.scss', ['sass']);
  // gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// gulp.task('doc', shell.task([
//   './node_modules/jsdoc/jsdoc.js src/js/ ./README.md -d ./doc'
// ]));

// gulp.task('js', function () {
//   return gulp.src('src/js/*.js')
    // .pipe(uglify())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    // .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.stream());
// });

gulp.task('ts', function () {
  return gulp.src('./src/ts/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('dist', ['sass', 'ts']);

gulp.task('default', ['serve']);