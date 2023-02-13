module.exports = {
  presets: [['@babel/preset-env', { targets: 'defaults' }]],
  plugins: [
    ['@babel/plugin-proposal-decorators', { version: 'legacy' }],
    '@babel/plugin-proposal-class-properties'
  ]
};
