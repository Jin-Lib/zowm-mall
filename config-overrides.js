const { override, overrideDevServer, fixBabelImports } = require('customize-cra');
const proxy = require('./src/config/proxy');

module.exports = {
  webpack: override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    })
  ),
  devServer: overrideDevServer((config) => {
    config.proxy = proxy;

    return config;
  })
}