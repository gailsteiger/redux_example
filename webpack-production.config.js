const WebpackStrip = require('strip-loader');
const devConfig = require('./webpack.config');

var stripLoader = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: WebpackStrip.loader('console.log')
};


devConfig.module.loaders.push(stripLoader);

module.exports = devConfig;