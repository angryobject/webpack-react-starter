const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


function config(opts) {
   opts = opts || {};


   const DEV = !!opts.dev;


   return {

      // src directory
      context: path.resolve() + '/src',


      entry: {
         main: (DEV ? [
            'webpack-dev-server/client?http://localhost:9000',
            'webpack/hot/only-dev-server'
         ] : []).concat('./scripts/main.js')

         // other entry points
         // , a: ['./scripts/a.js']

         // or separate entry point for vendor modules
         // (not shure i got it right & it'll work though)
         // , vendor: ['classnames', 'lodash', 'react']

      },


      output: {
         // output dir
         path: path.resolve() + '/dist',

         // output chunk name
         filename: '[hash].js',

         publicPath: DEV ? 'http://localhost:9000/' : void 0
      },


      plugins: [

         // dependency injection
         new webpack.DefinePlugin({
            'process.env.NODE_ENV': DEV ? '"development"' : '"production"'
         }),

         // auto load modules
         new webpack.ProvidePlugin({
            // whenever React is used, add React = require('react') automatically
            React: 'react',
            ReactDOM: 'react-dom'
         }),

         // extract all css into one file
         new ExtractTextPlugin('[hash].css', { allChunks: true, disable: DEV }),

         // generate html
         new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
            hash: false,
            minify: {
               collapseWhitespace: true,
               minifyCSS: true,
               minifyJS: true
            },

            title: 'My App',
            description: 'You wouldn\'t believe',
            lang: 'en'
         })

         // extract common chunks (if multiple entry points) to init.js
         // , new webpack.optimize.CommonsChunkPlugin('init.js')

         // or extract vendor chunks to separate file
         // , new webpack.optimize.CommonsChunkPlugin(
         //    'vendor', /* chunkName= */
         //    'vendor.bundle.js' /* filename= */
         // ),
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
               loader: 'baggage?style.sass=styles'
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
                  // if you don't want CSS Modules, i.e. local scoped css by default,
                  // remove `modules` query param
                  'css?modules&sourceMap!postcss?sourceMap!sass?indentedSyntax&sourceMap' +
                     '&includePaths[]=' + path.resolve('node_modules') +
                     '&includePaths[]=' + path.resolve('bower_components') +
                     '&includePaths[]=' + path.resolve('src')
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
            // used for dynamically loading json files (e.g via fetch)
            // if you need an embedded json parsed object, use json-loader
            // @TODO: minify json files
            {
               test: /\.json$/,
               loader: 'file?name=json/[hash].[ext]'
            }
         ]
      },


      postcss: function () {
         const autoprefixer = require('autoprefixer');
         const csswring = require('csswring');

         return [autoprefixer({ browsers: ['> 1%', 'ie > 8'] }), csswring];
      },


      resolve: {
         modulesDirectories: ['node_modules', 'bower_components', 'src']
      },


      debug: DEV,
      devtool: DEV ? 'eval' : void 0
   };
}

module.exports = config;
