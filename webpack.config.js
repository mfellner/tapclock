const fs = require('fs')
const path = require('path')
const nconf = require('nconf')
const webpack = require('webpack')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')

nconf.env()
     .defaults(require('./config.json'))

module.exports = {
  entry: {
    main: './src/index.jsx',
    vendor: Object.keys(packageJson.dependencies)
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.min.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: {
        presets: ['es2015-native-modules', 'stage-1', 'react']
      }
    }, {
      test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize')
    }, {
      test: /\.(otf|eot|svg|ttf|woff2?)/, loader: 'file'
    }, {
      test: /\.png$/, loader: 'url-loader?mimetype=image/png'
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.min.css'),
    new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.min.js'}),
    new webpack.DefinePlugin({
      'STORAGE_KEY': JSON.stringify(nconf.get('STORAGE_KEY')),
      'process.env.NODE_ENV': JSON.stringify(nconf.get('NODE_ENV'))
    }),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/img/favicon.ico',
      inject: false,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true
      }
    })
  ],
  devtool: 'cheap-module-source-map'
}
