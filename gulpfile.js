require( 'es6-promise' ).polyfill();

var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var rtlcss = require( 'gulp-rtlcss' );
var rename = require( 'gulp-rename' );
var plumber = require( 'gulp-plumber' );
var gutil = require( 'gulp-util' );
var imagemin = require( 'gulp-imagemin' );
var concat = require( 'gulp-concat' );
var jshint = require( 'gulp-jshint' );
var uglify = require( 'gulp-uglify' );
var browserSync = require( 'browser-sync' ).create();
var reload = browserSync.reload;

// Error output console
var onError = function(err) {
    console.log( 'An Error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit( 'end' );
};

// sass
gulp.task( 'sass', function(){
    return gulp.src( './sass/**/*.scss' )
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest( './' ) )

        .pipe(rtlcss())
        .pipe(rename({
            basename: 'rtl'
        }))
        .pipe(gulp.dest( './' ) );
});

// minify images
gulp.task( 'images', function(){
    return gulp.src( './images/src/*')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true
        }))
        .pipe(gulp.dest( './images/' ));
})

// concat js file(s)
gulp.task( 'js', function(){
    return gulp.src([ './js/*.js' ])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(jshint())
        .pipe(jshint.reporter( 'default' ))
        .pipe(concat( 'app.js' ))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest( './js'))
});

// watch
gulp.task( 'watch', function(){
    browserSync.init({
        files: [ './**/*.php' ],
        proxy: 'http://wpstarter.dev' // Change to your Local WP URL
    });
    gulp.watch( './sass/**/*.scss', ['sass', reload ]);
    gulp.watch( 'images/src/*', [ 'images', reload ] );
    gulp.watch( './js/**/*.js', [ 'js', reload ]);
});

// default task
gulp.task( 'default', [ 'sass', 'images', 'js', 'watch' ] );