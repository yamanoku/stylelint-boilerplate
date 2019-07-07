const gulp = require("gulp");
const $ = require("gulp-load-plugins")({
  pattern: ["gulp-*", "gulp.*"],
  replaceString: /\bgulp[\-.]/
});
const stylelint = require("stylelint");
const reporter = require("postcss-reporter");
const stylelintConfig = require("@yamanoku/stylelint-config");

gulp.task("sass", function() {
  return gulp
    .src("sass/**/*.scss")
    .pipe($.plumber())
    .pipe($.sass({ style: "expanded" }))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("lint-styles", function() {
  return gulp.src("sass/**/*.scss").pipe(
    $.postcss(
      [
        stylelint(stylelintConfig),
        reporter({
		  clearReportedMessages: true
        })
      ],
      {
        syntax: require("postcss-scss")
      }
    )
  );
});

gulp.task("watch", function() {
  gulp.watch(["sass/**/*.scss"], gulp.task("sass"));
  gulp.watch(["sass/**/*.scss"], gulp.task("lint-styles"));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("sass", "lint-styles", "watch"))
);
