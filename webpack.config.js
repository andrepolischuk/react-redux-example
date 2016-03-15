'use strict';
const webpack = require('webpack');

const config = {
  devtool: '#cheap-source-map',
  entry: [
    './index'
  ],
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel'
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
};

const devConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client'
  ].concat(config.entry),
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ].concat(config.plugins)
}

module.exports = process.env.NODE_ENV === 'development' ?
  Object.assign(config, devConfig) :
  config;
