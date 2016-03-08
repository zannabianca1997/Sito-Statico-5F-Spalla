var gulp        = require('gulp');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var del         = require('del');
var browserSync = require('browser-sync');

gulp.task('clean', function(){
   return del.sync('./dist');
});

gulp.task('jade', function(){
	gulp.src('./src/views/pages/*.jade')
    	.pipe(jade())
    	.pipe(gulp.dest('./dist/'));
});


gulp.task('css', function(){
    gulp.src('./src/styles/**/*')
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('js', function(){
    gulp.src('./src/scripts/**/*')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('fonts', function(){
    gulp.src('./src/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('watch', function(){
  gulp.watch('./src/views/**/*',  ['jade']);
  gulp.watch('./src/scripts/**/*',  ['js']);
  gulp.watch('./src/styles/**/*',  ['css']);
  gulp.watch('./src/fonts/**/*',  ['fonts']);
})

gulp.task('browser-sync', function () {
    browserSync({
      // informs browser-sync to proxy our expressjs app which would run at the following location
      // informs browser-sync to use the following port for the proxied app
      // notice that the default port is 3000, which would clash with our expressjs
      server: './dist',
      baseDir: './',
      port: 4000,
      notify: false
  });
});

gulp.task('build', ['clean', 'jade', 'css', 'js', 'fonts']);

gulp.task('default', ['build', 'browser-sync', 'watch']);
