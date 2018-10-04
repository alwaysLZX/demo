const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        open: true,
        overlay: true
    }
});

module.exports = webpackConfig;
