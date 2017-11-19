const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, './src/main.jsx'),
    github: path.resolve(__dirname, './src/github/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['bundle'],
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['github'],
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'github.html'
    }),
    new ExtractTextWebpackPlugin('styles.css'),
    new UglifyJSWebpackPlugin({
      cache: path.resolve(__dirname, './.cache'),
      parallel: true,
      sourceMap: true
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
    }, {
      test: /\.s?css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]',
            camelCase: 'dashesOnly',
            minimize: {
              preset: 'advanced'
            },
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }]
  },
  devtool: 'source-map',
  watch: true
}
