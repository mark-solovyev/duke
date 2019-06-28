const gulp = require("gulp");
const rm = require("gulp-rm");
const webpack = require("webpack");
const gulpWebpack = require("gulp-webpack");
const webpackConfig = require("./webpack.config.js");

const PATHS = {
    scripts: {
        src: "./src/scripts",
        dist: "./dist/scripts"
    }
}

gulp.task("copy", ()=> {
    return gulp.src("./src/index.html")
    .pipe(gulp.dest("./dist"));
});

gulp.task("remove", ()=> {
    return gulp.src("./dist/**/*.*", {read: false})
    .pipe(rm());
});


gulp.task("build", ()=> {
    return gulp.src(PATHS.scripts.src+"/index.js")
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(PATHS.scripts.dist));
})