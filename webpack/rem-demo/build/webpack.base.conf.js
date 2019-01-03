const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const moduleConfig = require("./wepack.module.conf");

const isProd = process.argv.indexOf('--mode=production') > -1;

let config = {
    entry: {},
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : "style-loader",
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
                    isProd ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: path.join(__dirname, '../')
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/assets/'),
                to: path.join(__dirname, '../dist/assets/')
            },
            {
                from: path.join(__dirname, '../src/assets/images/favicon.ico'),
                to: path.join(__dirname, '../dist/')
            }
        ]),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

// 添加entry和html插件
Object.keys(moduleConfig).forEach(key => {
    config.entry[key] = moduleConfig[key].entry;
    config.plugins.push(
        new HtmlWebpackPlugin({
            title: moduleConfig[key].title || '广州天河区分局运维管理平台',
            filename: `htmls/${key}.html`,
            template: `./src/htmls/${key}.html`,
            hash: true
        })
    );
});

module.exports = config;
