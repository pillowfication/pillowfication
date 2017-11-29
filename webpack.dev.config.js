const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './node_modules/cis89c'),
      to: 'cis89c'
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
    }),
    new UglifyJSWebpackPlugin({
      parallel: true,
      cache: path.resolve(__dirname, './.cache'),
      sourceMap: true
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
            localIdentName: '[local]--[hash:base64:5]',
            camelCase: 'dashes',
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
    }, {
      test: /\.woff2?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      }]
    }, {
      test: /\.(ttf|eot|svg)$/,
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
    }]
  },
  devtool: 'source-map',
  watch: true
}
