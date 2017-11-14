const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/main.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'index.html'
    }),
    new UglifyJSPlugin({
      cache: path.resolve(__dirname, './.cache'),
      parallel: true
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: path.resolve(__dirname, './.cache'),
        presets: [ 'env', 'react' ]
      }
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }]
  }
}
