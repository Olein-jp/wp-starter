require( 'es6-promise' ).polyfill();

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rtlcss = require( 'gulp-rtlcss' );
var rename = require( 'gulp-rename' );

// sass
gulp.task( 'sass', function(){
    return gulp.src( './sass/**/*.scss' )
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest( './' ) )

        .pipe(rtlcss())
        .pipe(rename({
            basename: 'rtl'
        }))
        .pipe(gulp.dest( './' ) );
});

// watch
gulp.task( 'watch', function(){
    gulp.watch( './sass/**/*.scss', ['sass']);
})

// default task
gulp.task( 'default', [ 'sass', 'watch' ] );