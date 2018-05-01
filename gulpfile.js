var gulp = require ("gulp");
var server = require("browser-sync").create();

var sass = require("gulp-sass");
var postcss = require ("gulp-postcss");
var autoprefixer = require("autoprefixer");
var inlinesvg = require("postcss-inline-svg");


gulp.task("style", function(){
  gulp.src("sass/style.scss")
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({browsers:[
      "last 3 versions"
    ]}),
    inlinesvg
  ]))
  .pipe(gulp.dest("css"))
  .pipe(server.stream());
});


gulp.task("serve", ["style"], function(){
  server.init({
    server:"."
  });
  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("*.html")
  .on("change", server.reload);
});
