import webpack from 'webpack';

export default {
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
