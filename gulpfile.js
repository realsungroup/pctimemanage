"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tslint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    runSequence = require("run-sequence"),
    mocha = require("gulp-mocha"),
    istanbul = require("gulp-istanbul"),
    browserSync = require('browser-sync').create();

//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function () {
    return gulp.src([
        "source/**/**.ts",
        "test/**/**.test.ts"
    ])
        .pipe(tslint({}))
        .pipe(tslint.report("verbose"));
});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProject = tsc.createProject("tsconfig.json");


gulp.task("build-app-du", function () {
    return gulp.src([
        "source/app/**/**.ts",
        "source/lib/**/**.ts",
        "typings/index.d.ts/",
        "source/interfaces/interfaces.d.ts"
    ])
        .pipe(tsc(tsProject))
        .js.pipe(gulp.dest("source/lib/"));
});
var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function () {
    return gulp.src([
        "test/**/*.ts",
        "typings/index.d.ts/",
        "source/interfaces/interfaces.d.ts"
    ])
        .pipe(tsc(tsTestProject))
        .js.pipe(gulp.dest("test/"));
});


gulp.task("build-du", function (cb) {
    runSequence(["build-app-du", "build-test"], cb);
});
//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function () {
    return gulp.src(['source/**/*.js'])
        // Covering files
        .pipe(istanbul())
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["istanbul:hook"], function () {
    return gulp.src('test/**/*.test.js')
        .pipe(mocha({ ui: 'bdd' }))
        .pipe(istanbul.writeReports());
});

//******************************************************************************
//* realease
//******************************************************************************
var appPublishPathName = "release";
var appSourcePathName = "app";
var outputRootFolder = appPublishPathName + "/" + appSourcePathName + "/";
/////////////////duranal
var durandaloutputAppFolder = appPublishPathName + "/app/";
var durandaloutputCssFolder = appPublishPathName + "/css/";
var durandaloutputLibFolder = appPublishPathName + "/lib/";
var durandaloutputFontsFolder = appPublishPathName + "/fonts/";
var durandaloutputjsFolder = appPublishPathName + "/js/";
var durandaloutputFolder = appPublishPathName + "/";
/////////////////duranal
gulp.task("bundle-du", function () {
    var bundler = browserify({
        debug: true

    });

    gulp.src("source/img/**")
        .pipe(gulp.dest(durandaloutputFolder + '/img'));

    gulp.src("source/cache.manifest")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/index.html")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/app.html")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/app.manifest")
        .pipe(gulp.dest(durandaloutputFolder));
    gulp.src("source/app/**")
        .pipe(gulp.dest(durandaloutputAppFolder));
    gulp.src("source/css/**")
        .pipe(gulp.dest(durandaloutputCssFolder));
    gulp.src("source/fonts/**")
        .pipe(gulp.dest(durandaloutputFontsFolder));
    gulp.src("source/js/**")
        .pipe(gulp.dest(durandaloutputjsFolder));
    gulp.src("source/lib/**")
        .pipe(gulp.dest(durandaloutputLibFolder));


    gulp.src("source/*.json")
        .pipe(gulp.dest(durandaloutputFolder));


});
//******************************************************************************
//* DEV SERVER for duarandal
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch-durandal-debug", ["default-du"], function () {

    browserSync.init({
        server: "./" + durandaloutputFolder

    });
    //test2
    gulp.watch(["source/app.manifest", "source/cache.manifest", "source/css/**", "source/**/**.json", "scripts/css/*.css", "source/*.html", "source/**/**.ts", "source/**/**.js", "source/**/**/**", "source/**/**.html", "test/**/*.ts"], ["default-du"]);
    gulp.watch(durandaloutputFolder + "/*.*").on('change', browserSync.reload);
});


//******************************************************************************
//* DEV SERVER
//******************************************************************************


//******************************************************************************
//* DEFAULT
//******************************************************************************

gulp.task("default-du", function (cb) {
    runSequence("lint", "build-du", "bundle-du", cb);
});
//******************************************************************************
//* durandal
//***
var durandal = require('gulp-durandal');
var durandalReleaseDir = 'durandalRelease'
var appdir = 'app'
gulp.task('durandal', function () {
     durandal({
        baseDir: 'source/app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
        output: 'main.js', //same as default, so not really required.
        almond: true,
        minify: false

    })
        .pipe(gulp.dest(durandalReleaseDir + '/' + appdir));
    gulp.src("scripts/**")
        .pipe(gulp.dest(durandalReleaseDir + "/scripts"));
    gulp.src("source/img/**")
        .pipe(gulp.dest(durandalReleaseDir + '/img'));
    gulp.src("source/fonts/**")
        .pipe(gulp.dest(durandalReleaseDir + '/fonts'));
    gulp.src("source/index.html")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/app.html")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/app.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/cache.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/css/**")
        .pipe(gulp.dest(durandalReleaseDir + "/css"));
    gulp.src("source/lib/**")
        .pipe(gulp.dest(durandalReleaseDir + "/lib"));
    gulp.src("source/js/**")
        .pipe(gulp.dest(durandalReleaseDir + "/js"));
    gulp.src("vendor/**")
        .pipe(gulp.dest(durandalReleaseDir + "/vendor"));
    gulp.src("swfupload/**")
        .pipe(gulp.dest(durandalReleaseDir + "/swfupload"));
    gulp.src("source/*.json")
        .pipe(gulp.dest(durandalReleaseDir));

});

gulp.task('durandal-pack', function () {
    durandal({
        baseDir: 'source/app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
<<<<<<< HEAD
        output: 'main-1.4.4.js', //same as default, so not really required.
=======
        output: 'main-1.5.5.js', //same as default, so not really required.
>>>>>>> origin/master
        almond: true,
        minify: false

    })
        .pipe(gulp.dest(durandalReleaseDir + '/' + appdir));
    gulp.src("scripts/**")
        .pipe(gulp.dest(durandalReleaseDir + "/scripts"));
    gulp.src("source/img/**")
        .pipe(gulp.dest(durandalReleaseDir + '/img'));
    gulp.src("source/fonts/**")
        .pipe(gulp.dest(durandalReleaseDir + '/fonts'));
    gulp.src("source/index.html")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/app.html")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/app.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/cache.manifest")
        .pipe(gulp.dest(durandalReleaseDir));
    gulp.src("source/css/**")
        .pipe(gulp.dest(durandalReleaseDir + "/css"));
    gulp.src("source/lib/**")
        .pipe(gulp.dest(durandalReleaseDir + "/lib"));
    gulp.src("source/js/**")
        .pipe(gulp.dest(durandalReleaseDir + "/js"));
    gulp.src("vendor/**")
        .pipe(gulp.dest(durandalReleaseDir + "/vendor"));
    gulp.src("swfupload/**")
        .pipe(gulp.dest(durandalReleaseDir + "/swfupload"));
    gulp.src("source/*.json")
        .pipe(gulp.dest(durandalReleaseDir));

});
//******************************************************************************
//* DEV SERVER for duarandal
//******************************************************************************

//var currentStartpage="domesticfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw=="; 
//var currentStartpage="internationalfilght.html?user=demo1&ucode=bTqoF2CcMCj7uIOBllZtDw==";

gulp.task("watch-durandal", ["durandal"], function () {

    browserSync.init({
        server: "./" + durandalReleaseDir

    });
    //test2
    gulp.watch(["source/cache.manifest", "source/app.manifest", "source/**/**.json", "scripts/css/*.css", "source/*.html", "source/**/**.ts", "source/**/**.js", "source/**/**.html", "test/**/*.ts"], ["durandal"]);
    gulp.watch(durandalReleaseDir + "/*.*").on('change', browserSync.reload);
});
gulp.task("browse", function () {

    browserSync.init({
        server: "./" + appPublishPathName

    });

});

