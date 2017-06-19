/* eslint-disable arrow-body-style */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import sequence from 'run-sequence';

const run = sequence.use(gulp);

gulp.task('default', ['build']);

gulp.task('build', (done) => {
    run('clean', ['build:lib'], done);
});

gulp.task('clean', () => {
    return del(['lib']);
});

gulp.task('build:lib', () => {
    return gulp.src(['src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});
