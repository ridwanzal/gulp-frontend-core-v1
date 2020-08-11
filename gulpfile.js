/**
 generic gulp modules
 custom by ridwanzal
 * 
 */

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const browsersync = require("browser-sync").create();
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const twig = require("gulp-twig");
const cache = require("gulp-cache");
const prettyHtml = require("gulp-pretty-html");
const eslint = require("gulp-eslint");
const htmlmin = require("gulp-htmlmin");
const removelogs = require("gulp-removelogs");
const stripdebug = require("gulp-strip-debug");
// const imagemin = require('gulp-imagemin');
// const replace = require("gulp-replace");

const port = 8000;

const paths = {
    root: {
        css: "sass/",
        js: "js/",
        template: "templates/",
        distCss: "dist/css/",
        distJs: "dist/js/",
        tempCss: ".tmp/css/",
        tempJs: ".tmp/js/",
    }
};

function serveList(done) {
    browsersync.init({
        server: {
            baseDir: ".tmp",
            directory: true, //show sebagai directory listing
            proxy: "localhost:3001"
        },
        port,
        open: false,
        notify: false,
        logLevel: "debug",
        logFileChanges: true,

    });
    done();
}

function serveDev(done) {
    browsersync.init({
        server: {
            baseDir: "./dist",
            proxy: "localhost:3001"
        },
        port,
        open: false,
        notify: false,
        logLevel: "debug",
        logFileChanges: true,

    });
    done();
}

function browserSyncReload(done) {
    cache.clearAll();
    browsersync.reload();
    done();
}

function css() {
    return gulp
        .src(paths.root.css + "style.scss")
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(plumber(function(error) {}))
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // write sourcemaps file in current directory
        .pipe(gulp.dest(paths.root.tempCss)) // put final CSS in  folder
        .pipe(gulp.dest(paths.root.distCss)) // put final CSS in  folder
        .pipe(browsersync.stream());
}

function js() {
    return gulp
        .src([
            paths.root.js + "entry.js",
            paths.root.js + "map.js",
            paths.root.js + "popup.js",
            paths.root.js + "lightslider.js",
            paths.root.js + "search.js",
        ])
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(concat("index.js"))
        .pipe(stripdebug())
        .pipe(plumber(function(error) {}))
        .pipe(uglify())
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(sourcemaps.write("./")) // write sourcemaps file in current directory
        .pipe(gulp.dest(paths.root.tempJs)) // put final js in folder
        .pipe(gulp.dest(paths.root.distJs)) // put final js in folder
        .pipe(browsersync.stream());
}

function twigHtml() {
    return gulp
        .src(paths.root.template + "layout/**/*.twig")
        .pipe(twig())
        .pipe(prettyHtml()) //
        // .pipe(htmlmin({ collapseWhitespace: true }))
        // .pipe(gulp.dest("./dist"))
        .pipe(gulp.dest(".tmp"))
        .pipe(browsersync.stream());
}

function twigBuild() {
    gulp.task(
        "reloadHtml",
        gulp.series([twigHtml], function() {
            gulp.watch(paths.root.template + "**/*.twig", browserSync.reload);
            gulp.watch("**/*.html", browserSync.reload);
        })
    );
}

function watchFiles() {
    gulp.watch([paths.root.css + "**/*"], css);
    gulp.watch([paths.root.js + "**/*"], gulp.series(js));

    gulp.watch([paths.root.template + "**/*"], gulp.series(twigHtml));
    gulp.watch(
        [
            "**/*.html",
            paths.root.template + "**/*.twig",
            // paths.root.tempCss + "**/*.css",
            // paths.root.tempJs + "**/*.js",
            // paths.root.css + "**/*.scss",
            // paths.root.css + "**/*.css",
            // paths.root.css + "**/*.sass",
            paths.root.css + "**/*.scss",
            paths.root.css + "**/*.css",
            paths.root.js + "**/*.js"
        ],
        gulp.series(browserSyncReload)
    );
}

// export sebagai *.html di .tmp folder 
function to_html() {
    return gulp
        .src(paths.root.template + "layouts/**/*.twig")
        .pipe(plumber(function(error) {}))
        .pipe(twig({
            pretty: true
        }))
        .pipe(prettyHtml()) //
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(".tmp"))
        .pipe(browsersync.stream());
}


const watch = gulp.series(gulp.parallel(to_html, watchFiles, twigBuild, serveList));
const dev = gulp.series(gulp.parallel(watchFiles, twigBuild, serveDev));

exports.dev = dev;
exports.serve = watch; // jalankan dengan command options $gul serve