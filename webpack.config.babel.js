import webpack from 'webpack';

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
        test: /\.js$/,
        loaders: [
          'babel-loader'
        ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  devServer: {
    inline: true,
    historyApiFallback: true,
    progress: true,
    port: 3000,
    stats: {
      colors: true
    }
  }
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
}

export default config;
