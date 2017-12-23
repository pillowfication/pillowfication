const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

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
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './node_modules/cis89c'),
      to: 'cis89c'
    }, {
      from: path.resolve(__dirname, './src/github/assets'),
      to: ''
    }]),
    new HtmlWebpackPlugin({
      chunks: [ 'bundle' ],
      template: path.resolve(__dirname, './src/index.pug'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: [ 'github' ],
      template: path.resolve(__dirname, './src/github/index.pug'),
      filename: 'github.html'
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].css',
      ignoreOrder: true
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, './.cache'),
          presets: [ 'env', 'react' ]
        }
      }]
    }, {
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader'
      }]
    }, {
      test: /\.s?css$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            camelCase: 'dashesOnly',
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      })
    }, {
      test: /\.(eot|ttf|woff2?)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'images/[name].[ext]'
        }
      }]
    }, {
      test: /\.brainfuck$/,
      use: [{
        loader: 'raw-loader'
      }]
    }]
  },
  devtool: 'source-map',
  watch: true
}
