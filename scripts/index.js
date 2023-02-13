const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

const NODE_ENV = process.env.NODE_ENV;

const production = NODE_ENV === 'production';
const development = NODE_ENV === 'development';

const webpackDevServerHandler = (devConfigPromise) => {
  devConfigPromise().then(async ({ webpackDevConfig, serverConfig }) => {
    const compiler = webpack(webpackDevConfig);
    const server = new WebpackDevServer(serverConfig, compiler);
    await server.start();
  });
};

const webpackBuildHandler = (config) => {
  webpack(config, (err, stats) => {
    if (err) throw err;
    if (stats.hasErrors()) {
      console.log(chalk.red('打包遇到错误:.\n'));
      process.exit(1);
    }
    console.log(chalk.cyan('构建完成.\n'));
    process.exit(0);
  });
};

function startBuild() {
  if (development) {
    const config = require('./webpack.dev.config.js');
    webpackDevServerHandler(config);
  }
  if (production) {
    const config = require('./webpack.prod.config.js');
    webpackBuildHandler(config);
  }
}

startBuild();
