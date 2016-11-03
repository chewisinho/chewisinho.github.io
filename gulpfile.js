var fs = require("fs");
var gulp = require("gulp");
var path = require("path");
var twigMarkdown = require("twig-markdown");

var data = require("gulp-data");
var prettify = require("gulp-prettify");
var twig = require("gulp-twig");

function getFile(path) {
  return JSON.parse(fs.readFileSync(path));
}

function getJsonData(file) {
  return getFile("src/data/" + path.basename(file.path) + ".json");
}

function twigGenerator() {
  return twig({
    extend: twigMarkdown
  });
}

gulp.task("default", function() {
  return gulp.src("src/html/*.html")
    .pipe(data(getJsonData))
    .pipe(twigGenerator())
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest("."));
});

