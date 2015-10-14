const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('default', ['clean'], function () {
   gulp.start('build');
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('build', ['webpack'], function () {
   return gulp.src('dist/**/*')
      .pipe($.size({title: 'build', gzip: true}));
});

gulp.task('webpack', function(cb) {
    webpack(webpackConfig(), function(err, stats) {
        if (err) {
           throw new $.util.PluginError('webpack', err);
        }

        $.util.log('[webpack]', stats.toString());
        cb();
    });
});

gulp.task('serve', function() {
   const compiler = webpack(webpackConfig({dev: true}));

   new WebpackDevServer(compiler, {
      contentBase: './src',
      hot: true,
      historyApiFallback: true
   }).listen(9000, 'localhost', function(err) {
      if(err) {
         throw new $.util.PluginError('webpack-dev-server', err);
      }

      $.util.log('[webpack-dev-server]', 'http://localhost:9000/');
   });
});
