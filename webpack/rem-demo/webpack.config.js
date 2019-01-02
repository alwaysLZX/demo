const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = false;

module.exports = {
    mode: 'development',
    // mode: 'production',
    devtool: 'inline-source-map',   // 不适合用于正式环境
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]'
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss|\.sass$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: path.join(__dirname, './')
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './src/assets/'),
                to: path.join(__dirname, './dist/assets/')
            },
            {
                from: path.join(__dirname, './src/assets/images/favicon.ico'),
                to: path.join(__dirname, './dist/')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: '广州天河区分局运维管理平台',
            filename: 'htmls/index.html',
            template: './src/htmls/index.html',
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
