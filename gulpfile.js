var gulp         = require( 'gulp' );
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var plumber      = require( 'gulp-plumber' );
var progeny      = require( 'gulp-progeny' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var changed      = require( 'gulp-changed' );
var imagemin     = require( 'gulp-imagemin' );
var imageminJpg  = require( 'imagemin-jpeg-recompress' );
var imageminPng  = require( 'imagemin-pngquant' );
var imageminGif  = require( 'imagemin-gifsicle' );
var svgmin       = require( 'gulp-svgmin' );
var concat       = require( 'gulp-concat' );
var jshint       = require( 'gulp-jshint' );
var rename       = require( 'gulp-rename' );
var uglify       = require( 'gulp-uglify' );
var browserSync  = require( 'browser-sync' );

var rtlcss       = require( 'gulp-rtlcss' );
var reload       = browserSync.reload;

// Sass
gulp.task( 'sass', function(){
    gulp.src( './src/assets/sass/**/*.scss' )
        .pipe( plumber() )
        .pipe( progeny() )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            outputStyle: 'expanded'
        } ) )
        .pipe( autoprefixer( {
            browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
            cascade: false
        } ) )
        .pipe( sourcemaps.write( './' ) )
        .pipe( gulp.dest( './' ) );
} );

// create rtl.css
gulp.task( 'rtl', function() {
    gulp.src( './style.css' )
        .pipe( plumber() )
        .pipe( sourcemaps.init() )
        .pipe( rtlcss() )
        .pipe( rename({
            basename: 'rtl'
        }))
        .pipe( sourcemaps.write( './' ) )
        .pipe(gulp.dest( './' ) );
} );

// imagemin
gulp.task( 'imagemin', function() {
    // jpeg,png,gif
   gulp.src( './src/assets/images/**/*.+(jpg|jpeg|png|gif)' )
       .pipe( changed( './images' ) )
       .pipe( imagemin( [
           imageminPng(),
           imageminJpg(),
           imageminGif({
               interlaced: false,
               optimizationLevel: 3,
               colors: 180
           } )
       ] ) )
       .pipe( gulp.dest( './images/' ) );
   // svg
   gulp.src( './src/assets/images/**/*.+(svg)' )
       .pipe( changed( './images' ) )
       .pipe( svgmin() )
       .pipe( gulp.dest( './images/' ) );
} );

// concat js file(s)
gulp.task( 'js.concat', function() {
    gulp.src( [
        './src/assets/js/sample.js'
    ] )
        .pipe( plumber() )
        .pipe( jshint() )
        .pipe( jshint.reporter( 'default' ) )
        .pipe( concat( 'bundle.js' ) )
        .pipe( gulp.dest( './js' ) );
} );

// compress js file(s)
gulp.task( 'js.compress', function() {
    gulp.src( './js/bundle.js' )
        .pipe( plumber() )
        .pipe( uglify() )
        .pipe( rename( 'bundle.min.js' ) )
        .pipe( gulp.dest( './js' ) );
} );

// copy library in node_modules to dist directory
gulp.task( 'copylib', function() {
    gulp.src('node_modules/[PACKAGE_NAME]').pipe(gulp.dest( './src/lib/[DIR_NAME]' ) );
} );

// watch
gulp.task( 'watch', function(){
    browserSync.init({
        files: [ './**/*.php' ],
        proxy: 'http://gulpdev.wordpress' // Change to your Local WP URL
    });
    gulp.watch( './src/assets/sass/**/*.scss', ['sass', 'rtl', reload ]);
    gulp.watch( './src/assets/images/**/*', [ 'imagemin', reload ] );
    gulp.watch( './src/assets/js/**/*', [ 'js.concat', 'js.compress', reload ]);
});

// default task
gulp.task( 'default', [ 'watch' ] );
