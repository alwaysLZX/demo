const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 100,
                            context: './src',
                            name: '[path][name].[hash:8].[ext]',
                            publicPath: ''
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            { from: './src/assets/images/favicon.ico', to: 'favicon.ico' }
        ]),
        // 自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/assets/template.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.less', '.css'],
        // 别名
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    // 防止将某些 import 的包(package)打包到 bundle 中
    externals: {
        // lodash: {
        //     commonjs: 'lodash',
        //     amd: 'lodash',
        //     root: '_' // 指向全局变量
        // }
    },
    // 将展示一条错误，通知你这是体积大的资源
    performance: {
        // hints: 'error',
        // maxEntrypointSize: 1024 * 1024 * 5 // 默认值（250kb）
    },
    optimization: {
        // 模块拆分
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
                // common: {
                //     name: 'common',
                //     chunks: 'all',
                //     minSize: 1,
                //     priority: 0
                // }
            }
        }
    }
};
