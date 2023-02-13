const { merge } = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config');
const projectDir = process.cwd();
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  plugins: [new MiniCssExtractPlugin()],
  output: {
    path: path.join(projectDir, 'dist'),
    publicPath: '/',
    clean: true,
    filename: 'assets/script/[name].[contenthash:8].js'
  }
});
