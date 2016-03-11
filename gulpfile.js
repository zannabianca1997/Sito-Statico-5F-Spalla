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
  browserSync({
    server: './dist',
    baseDir: './',
    port: 4000,
    notify: false
  });

  gulp.watch('./src/views/**/*',  ['jade']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*',  ['js']).on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*',  ['css']).on('change', browserSync.reload);
  gulp.watch('./src/fonts/**/*',  ['fonts']).on('change', browserSync.reload);
});

gulp.task('build', ['clean', 'jade', 'css', 'js', 'fonts']);

gulp.task('default', ['build', 'watch']);
