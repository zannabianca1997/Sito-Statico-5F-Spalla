var pngquant    = require('imagemin-pngquant');
var del         = require('del');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');
var concatJs    = require('gulp-concat');
var concatCss   = require('gulp-concat-css');

gulp.task('clean', function(){
   return del.sync('./dist');
});

gulp.task('jade', function(){
	gulp.src('./src/views/pages/*.jade')
  	.pipe(jade())
  	.pipe(gulp.dest('./dist/'));
});

gulp.task('css', function(){
  gulp.src(['./src/styles/vendor/*.css', './src/styles/*.css'])
    .pipe(concatCss('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('js', function(){
  gulp.src(['./src/scripts/vendor/*.js', './src/scripts/*.js'])
    .pipe(concatJs('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('imagemin', function(){
  gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function(){
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('watch', function(){
  browserSync({
  server: './dist',
  baseDir: '/',
  port: 4000,
  notify: false
  });

  gulp.watch('./src/views/**/*', ['jade']).on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*', ['js']).on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*', ['css']).on('change', browserSync.reload);
  gulp.watch('./src/fonts/**/*', ['fonts']).on('change', browserSync.reload);
});

gulp.task('build', ['clean', 'imagemin', 'jade', 'css', 'js', 'fonts']);

gulp.task('default', ['build', 'watch']);
