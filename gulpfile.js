const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      less = require('gulp-less'),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      cleanCSS = require('gulp-clean-css'),
      htmlmin = require('gulp-htmlmin');

const config = {
    paths: {
        less: './src/less/**/*.less',
        html: './public/index.html'
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public/css'
    }
};


gulp.task('less', function() {
    return gulp.src(config.paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('server', function(){

    browserSync.init({
        server: {
            baseDir: 'public'
        }
    });
    
    gulp.watch(config.paths.less, gulp.parallel('less'));
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});


gulp.task('watch', function() {
    gulp.watch(config.paths.less, gulp.parallel("less"));
    gulp.watch("src/*.html").on("change", gulp.parallel('html'));
    gulp.watch("src/js/**/*.js", gulp.parallel('scripts'));
    gulp.watch("src/img/**/*", gulp.parallel('images'));
});


gulp.task('html', function() {
    return gulp.src("src/*.html")
           .pipe(htmlmin({collapseWhitespace: true}))
           .pipe(gulp.dest("public/"));
});


gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
           .pipe(gulp.dest("public/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
           .pipe(gulp.dest("public/fonts"));
});


gulp.task('images', function() {
    return gulp.src("src/img/**/*")
           .pipe(gulp.dest("public/img"));
});



gulp.task('default', gulp.parallel('watch', 'server', 'less', 'html', 'scripts', 'images', 'fonts'));