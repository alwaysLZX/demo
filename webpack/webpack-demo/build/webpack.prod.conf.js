const webpack = require('webpack');
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
    plugins: [
        new ExtractTextPlugin({
            // 如果需要加上文件目录'css/[name].css'，则需要考虑css里面应用文件相对目录问题
            filename: '[name].css',
            allChunks: true
        })
    ]
});

module.exports = webpackConfig;
