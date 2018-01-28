const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const stylelintConfig = require('@geekcojp/stylelint-config');

gulp.task('sass', ["lintStyles"], function() {
  return gulp
    .src('sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass({style : 'expanded'}))
    .pipe($.csscomb())
    .pipe(gulp.dest('dist/css'));
});

gulp.task("lintStyles", function() {
  return gulp.src('sass/**/*.scss')
    .pipe(
    $.postcss([
      stylelint(stylelintConfig),
      reporter({
        clearMessages: true
      })
    ])
  );
});

gulp.task('watch', function () {
    gulp.watch(["sass/**/*.scss", "!sass/**/_*", "!sass/_**/*.scss"], ['sass']);
});

gulp.task('default', ['sass', 'watch']);
