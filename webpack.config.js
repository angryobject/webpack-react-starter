const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function config(opts) {
   opts = opts || {};


   const DEV = opts.dev;


   return {

      // src directory
      context: __dirname + '/src',


      entry: {
         main: (DEV ? [
            'webpack-dev-server/client?http://localhost:9000',
            'webpack/hot/only-dev-server'
         ] : []).concat('./scripts/main.js'),

         // other entry points
         // a: ['./scripts/a.js']

         // or separate entry point for vendor modules
         // (not shure i got it right & it'll work though)
         // vendor: ['classnames', 'lodash', 'react'],

      },


      output: {
         // output dir
         path: __dirname + '/dist',

         // output chunk name
         filename: '[name].js',

         publicPath: DEV ? 'http://localhost:9000/' : void 0
      },


      plugins: [
         // extract common chunks (if multiple entry points) to init.js
         // new webpack.optimize.CommonsChunkPlugin('init.js')

         // or extract vendor chunks to separate file
         // new webpack.optimize.CommonsChunkPlugin(
         //    'vendor', /* chunkName= */
         //    'vendor.bundle.js' /* filename= */
         // ),

         // dependency injection
         new webpack.DefinePlugin({
            // DEBUG: true
         }),

         // auto load modules
         new webpack.ProvidePlugin({
            // whenever _ is used, require('lodash') automatically and assign to _
            React: 'react',
            _: 'lodash',
            cx: 'classnames'
         }),

         // extract all css into one file
         new ExtractTextPlugin('[name].css', { allChunks: true, disable: DEV ? true : false })
      ].concat(DEV ? [
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoErrorsPlugin()
      ] : [
         // optimization
         new webpack.optimize.OccurenceOrderPlugin(true),
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.UglifyJsPlugin()
      ]),


      module: {
         preLoaders: [
            // require('style.sass') in every component, if present
            // (i.e. in every index.js inside components directory)
            {
               test: /\/components\/.+index\.js$/,
               loader: 'baggage?style.sass'
            }
         ],

         loaders: [
            // js files
            {
               test: /\.jsx?$/,
               exclude: /(node_modules|bower_components)/,
               loader: (DEV ? 'react-hot!' : '') + 'babel?optional[]=runtime&sourceMap'
            },

            // sass files
            {
               test: /\.sass$/,
               loader: ExtractTextPlugin.extract(
                  'style',
                  'css?sourceMap!postcss?sourceMap!sass?indentedSyntax&sourceMap&' +
                     'includePaths[]=' + __dirname + '/node_modules&' +
                     'includePaths[]=' + __dirname + '/bower_components&' +
                     'includePaths[]=' + __dirname + '/src'
               )
            },

            // css files
            {
               test: /\.css$/,
               loader: ExtractTextPlugin.extract(
                  'style',
                  'css?sourceMap!postcss?sourceMap'
               )
            },

            // raster image files
            {
               test: /\.(jpe?g|png|gif)$/i,
               loaders: [
                  'url?name=images/[hash].[ext]&limit=10000',
                  'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
               ]
            },

            // vector image files
            {
               test: /\.svg$/,
               loaders: [
                  'url?name=images/[hash].[ext]&limit=10000'

                  // no optimization for now cause it breaks svgs regularly
                  // and needs a proper configuration
                  // 'image-webpack?{svgo: {...configMe}}'
               ]
            },

            // fonts
            {
               test: /\.(woff|ttf|otf|eot)$/,
               loader: 'file?name=fonts/[hash].[ext]'
            },

            // json
            // @TODO: minify json files
            {
               test: /\.json$/,
               loader: 'file?name=json/[hash].[ext]'
            }
         ]
      },


      postcss: function () {
         return [require('autoprefixer-core'), require('csswring')];
      },


      resolve: {
         modulesDirectories: ['node_modules', 'bower_components', 'src']
      },


      debug: DEV ? true : false,
      devtool: DEV ? 'eval' : void 0,
   };
}

module.exports = config;
