const portfinder = require('portfinder');
const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const projectDir = process.cwd();
const serverConfig = {
  port: 6201,
  client: {
    overlay: {
      errors: true,
      warnings: false
    }
  },
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  static: {
    directory: path.join(projectDir, 'dist'),
    publicPath: '/'
  },
  compress: true,
  open: false,
  proxy: {},
  hot: true
};

const webpackDevConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.join(projectDir, 'dist'),
    publicPath: '/',
    library: `vue3-micro-[name]`,
    libraryTarget: 'umd',
    filename: '[name].bundle.js'
  },
  devtool: 'inline-cheap-module-source-map'
});

module.exports = () =>
  new Promise((resolve, reject) => {
    portfinder.basePort = serverConfig.port;
    portfinder.getPort((err, port) => {
      if (err) return reject(err);
      serverConfig.port = port;
      resolve({ webpackDevConfig, serverConfig });
    });
  });
