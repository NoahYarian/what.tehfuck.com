var gulp = require('gulp'),
    $    = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'browser-sync']
    });

gulp.task('damnit', function (cb) {
  $.del('public')
    .then(function (paths) {
      console.log('Deleted files/folders/damns:\n', paths.join('\n'));
      cb();
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'join' of undefined") {
        console.log("Probably nothing to delete... Damn it!");
        cb();
      } else {
        console.log("damning error: ", err);
      }
    });
});

gulp.task('jsdamn', function () {
  gulp
    // .src($.mainBowerFiles('**/*.js'))
    .src(['bower_components/jquery/dist/jquery.js',
          'lib/jquery.fittext.js',
          'damn/damn.js'])
    .pipe($.concat('damn.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('jadedamn', function () {
  gulp
    .src('damn/damn.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('sassydamn', function () {
  gulp
    .src('damn/damn.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('copydamns', function() {
  gulp
    .src('damn/assets/*')
    .pipe(gulp.dest('public/damns'));
});

gulp.task('browser-damn', function() {
    $.browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('builddamns', ['jadedamn', 'sassydamn', 'jsdamn', 'copydamns']);

gulp.task('servedamns', ['builddamns'], function () {
  gulp.start('browser-damn');
  gulp.watch(['damn/*.jade'], ['jadedamn']).on('change', $.browserSync.reload);
  gulp.watch(['damn/**/*.scss'], ['sassydamn']).on('change', $.browserSync.reload);
  gulp.watch(['damn/**/*.js'], ['jsdamn']).on('change', $.browserSync.reload);
});

gulp.task('default', ['damnit'], function () {
  gulp.start('servedamns');
});
