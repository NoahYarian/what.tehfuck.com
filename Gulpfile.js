var gulp = require('gulp'),
    $    = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'del', 'browser-sync']
    });

gulp.task('fuckit', function (cb) {
  $.del('public')
    .then(function (paths) {
      console.log('Deleted files/folders/fucks:\n', paths.join('\n'));
      cb();
    })
    .catch(function (err) {
      if (err.message === "Cannot read property 'join' of undefined") {
        console.log("Probably nothing to delete... Fuck it!");
        cb();
      } else {
        console.log("fucking error: ", err);
      }
    });
});

gulp.task('jsfuck', function () {
  gulp
    // .src($.mainBowerFiles('**/*.js'))
    .src(['bower_components/jquery/dist/jquery.js',
          'lib/jquery.fittext.js',
          'fuck/fuck.js'])
    .pipe($.concat('fuck.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('jadefuck', function () {
  gulp
    .src('fuck/fuck.jade')
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('sassyfuck', function () {
  gulp
    .src('fuck/fuck.scss')
    .pipe($.sass()
      .on('error', $.sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('copyfucks', function() {
  gulp
    .src('fuck/assets/*')
    .pipe(gulp.dest('public/fucks'));
});

gulp.task('browser-fuck', function() {
    $.browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('buildfucks', ['jadefuck', 'sassyfuck', 'jsfuck', 'copyfucks']);

gulp.task('servefucks', ['buildfucks'], function () {
  gulp.start('browser-fuck');
  gulp.watch(['fuck/*.jade'], ['jadefuck']).on('change', $.browserSync.reload);
  gulp.watch(['fuck/**/*.scss'], ['sassyfuck']).on('change', $.browserSync.reload);
  gulp.watch(['fuck/**/*.js'], ['jsfuck']).on('change', $.browserSync.reload);
});

gulp.task('default', ['fuckit'], function () {
  gulp.start('servefucks');
});
