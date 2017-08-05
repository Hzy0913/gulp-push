var gulp = require('gulp');
var git = require('gulp-git');
var gulpSequence = require('gulp-sequence')

//// Run git commit
gulp.task('commit', function(){
    return gulp.src(['./*','!./node_modules'])
        .pipe(git.commit('ordinary commit'));
});

//// Run git push
gulp.task('push', function(){
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});

//// Run git pull
gulp.task('pull', function(){
    git.pull('origin', 'master', {args: '--rebase'}, function (err) {
        if (err) throw err;
    });
});

gulp.task( 'default', gulpSequence( 'commit', 'push'));
