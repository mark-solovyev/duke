const gulp = require("gulp");
const rm = require("gulp-rm");
const pug = require("gulp-pug");
const webpack = require("webpack");
const gulpWebpack = require("gulp-webpack");
const webpackConfig = require("./webpack.config.js");
const browserSync = require("browser-sync").create();


const PATHS = {
    templates: {
        pages: "./src/views/index.pug",
        src: "./src/views"
    },
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

gulp.task("templates", ()=> {
    return gulp.src(PATHS.templates.pages)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest("./dist"));
});

gulp.task("build", ()=> {
    return gulp.src(PATHS.scripts.src+"/index.js")
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(PATHS.scripts.dist));
});



gulp.task("relo", (callback)=> {
    browserSync.reload();
    callback();
});

gulp.task("run_server", ()=> {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

gulp.watch("./src/views/*.*", gulp.series("templates"));
//gulp.watch("./dist/*.*").on("change", browserSync.reload);
gulp.watch("./dist/*.*", gulp.series("relo"));

gulp.task("default", gulp.series("templates", "run_server"))