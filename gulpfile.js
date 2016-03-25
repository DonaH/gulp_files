var
  gulp = require('gulp'),
  concat = require('gulp-concat') ,
  uglify = require('gulp-uglify') ,
  uglifycss = require('gulp-uglifycss') ,
  nodemon = require('gulp-nodemon')
  browserSync = require('browser-sync')

gulp.task('minify-css', function(){
  gulp.src('public-dev/css/*.css')
    .pipe(concat('application.min.css'))
    .pipe(uglifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
})

gulp.task('nodemon', function(){
  nodemon({
    ext: 'js html css',
    env: {'NODE_ENV': 'development'}
  })
})

gulp.task('minify-js', function(){
  gulp.src('public-dev/js/*.js')
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
})

gulp.task('browser-sync', ['nodemon'], function(){
  browserSync.init(null, {
    proxy: 'http://localhost:3200',
    files: ['public-dev/**/*.*'],
    port: 7000
  })
})

gulp.watch('public-dev/js/*.js', ['minify-js'])
gulp.watch('public-dev/css/*.css', ['minify-css'])


gulp.task('default', ['browser-sync'])
