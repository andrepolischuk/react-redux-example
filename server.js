'use strict';
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const config = require('./webpack.config');

const compiler = webpack(config);
const port = 3000;

const app = new express()
  .use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  .use(hotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on port ${port}`)
  }
});
