/* eslint-disable max-len */
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

const env = process.env.NODE_ENV;

const config = {
  entry: [
    './index'
  ],
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          env === 'production' ?
            'css-loader?modules&camelCase&importLoaders=1' :
            'css-loader?modules&camelCase&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
    cssnext
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
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
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
