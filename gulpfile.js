const gulp = require('gulp')  
const browserSync = require('browser-sync').create()

function watchFiles(cb) {
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./public/"
      }
  })

  gulp.watch("public/*.js").on(
    "change", browserSync.reload
  )
  
  gulp.watch("public/*.html").on(
    "change", browserSync.reload
  )
}

exports.default = gulp.parallel(watchFiles)



























// gulp.task('watchTask', function (cb) {
  // gulp.watch('./*.js')
    // .pipe(connect.reload());
  // cb();
// });

// gulp.task('connect', function(cb) {
    // connect.server({
        // livereload: true
    // });
    // cb();
// });

// function watchFiles(cb) {
  // gulp.watch('public/*.html', function() {
    // console.log('html file change')
  // });
  
  // gulp.watch('public/*.js', function() {
    // console.log('js files change')
  // });
  // cb();
// }

// function connectExtension(cb) {
  // body omitted
  // connect.server({
      // root: ['public'],
      // port: 3000,
      // livereload: true
  // });
  // console.log('connectExtension')
  // cb();
// }