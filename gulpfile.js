var exec = require('child_process').exec;
var gulp = require('gulp');
var runSequence = require('run-sequence');
var bootlint  = require('gulp-bootlint');

// Validate html, links, etc.
gulp.task('html-proofer', function(done) {
  execute('htmlproofer ./index.min.html --check-html --check-favicon --check-external-hash', {}, done);
});

// Validate bootstrap
gulp.task('bootlint', function() {
  return gulp.src('./index.html.min')
    .pipe(bootlint({
      stoponerror: true
    }));
});

// Full test task
gulp.task('test', function(cb) {
  runSequence('html-proofer', 'bootlint', cb);
});

// Util to execute external command
function execute(cmd, opts, done) {
  console.log(cmd);
  exec(cmd, opts, function(error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(error);
  });
}