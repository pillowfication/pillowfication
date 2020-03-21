const path = require('path')
const webpack = require('webpack')
const incstr = require('incstr')
// const { getLocalIdent } = require('css-loader/dist/utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const generateId = incstr.idGenerator({
  alphabet: 'abcefghijklmnopqrstuvwxyzABCEFGHIJKLMNOPQRSTUVWXYZ0123456789'
})
const ids = {}

function getId (name) {
  if (ids[name]) {
    return ids[name]
  }

  const id = 'pf-' + generateId()
  ids[name] = id
  return id
}

/* eslint-disable */
const loaderUtils = require('loader-utils');
const normalizePath = require('normalize-path');
const cssesc = require('cssesc');

// eslint-disable-next-line no-control-regex
const filenameReservedRegex = /[<>:"/\\|?*\x00-\x1F]/g;
// eslint-disable-next-line no-control-regex
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
const reRelativePath = /^\.+/;

function getLocalIdent(loaderContext, localIdentName, localName, options) {
  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = normalizePath(
    path.relative(options.context || '', loaderContext.resourcePath)
  );

  // eslint-disable-next-line no-param-reassign
  options.content = `${options.hashPrefix + request}+${unescape(localName)}`;

  // Using `[path]` placeholder outputs `/` we need escape their
  // Also directories can contains invalid characters for css we need escape their too
  return cssesc(
    loaderUtils
      .interpolateName(loaderContext, localIdentName, options)
      // For `[hash]` placeholder
      .replace(/^((-?[0-9])|--)/, '_$1')
      .replace(filenameReservedRegex, '-')
      .replace(reControlChars, '-')
      .replace(reRelativePath, '-')
      .replace(/\./g, '-'),
    { isIdentifier: true }
  ).replace(/\\\[local\\\]/gi, localName);
}
/* eslint-enable */

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, './src/pillowfication/main.jsx'),
    blog: path.resolve(__dirname, './src/blog/main.jsx'),
    github: path.resolve(__dirname, './src/github/main.jsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: path.resolve(__dirname, './src/pillowfication/index.pug'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['blog'],
      template: path.resolve(__dirname, './src/blog/index.pug'),
      filename: 'blog.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['github'],
      template: path.resolve(__dirname, './src/github/index.pug'),
      filename: 'github.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './node_modules/cis89c'),
      to: 'cis89c'
    }, {
      // See github/_settings.scss:65
      from: path.resolve(__dirname, './src/github/assets'),
      to: ''
    }])
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [{
        loader: 'pug-loader'
      }]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }]
    }, {
      test: /\.s?css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            getLocalIdent: (...args) => getId(getLocalIdent(...args))
          },
          importLoaders: 2,
          localsConvention: 'dashesOnly'
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.(eot|ttf|otf|woff2?)(\?.*)?$/,
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
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
