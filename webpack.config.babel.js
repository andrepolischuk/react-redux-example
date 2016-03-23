/* eslint-disable max-len */
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';

const env = process.env.NODE_ENV;

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },
  postcss: [
    autoprefixer({
      browsers: [
        'last 2 versions'
      ]
    }),
    nested
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
} else {
  config.devServer = {
    inline: true,
    historyApiFallback: true,
    progress: true,
    port: 3000,
    stats: {
      colors: true
    }
  };
}

export default config;
