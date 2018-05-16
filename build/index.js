import browserify from 'browserify';
import gulp from 'gulp';
import source from 'vinyl-source-stream';


gulp.task( 'default', () => {
  return browserify( './code/index.js' )
    .transform( 'babelify', {
      'presets': [ 'es2015' ],
      'plugins': [ 'transform-async-to-generator' ]
    }) // Babel for browserify
    .bundle()
    .pipe( source( './Browser.js' ) )
    .pipe( gulp.dest( './' ) );
});
