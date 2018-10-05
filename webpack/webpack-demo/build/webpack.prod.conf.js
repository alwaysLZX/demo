const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        // 很重要
        publicPath: ''
    },
    module: {
        rules: []
    },
    plugins: []
});

module.exports = webpackConfig;
