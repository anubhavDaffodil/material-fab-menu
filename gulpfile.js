var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', function() {
  return gulp.src(['src/*.js', 'src/*.jsx'])
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-1']
    }))
    .pipe(gulp.dest('dist'));
});


