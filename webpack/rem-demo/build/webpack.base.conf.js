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
                    {
                        // 在这里单独指定了options，所以postcss不会去读取默认配置的文件[postcss.config.js]的配置
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('postcss-pxtorem')({
                                    rootValue: 72,
                                    minPixelValue: 2,
                                    propList: ["font", "font-size"]
                                })
                            ]
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 文件大小小于此限制则以base64的形式显示文件[单位：字节]
                            limit: 1024 * 10,
                            context: './src',
                            name: '[path][name].[hash:8].[ext]'
                        }
                    }
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
            chunks: [key],
            hash: true
        })
    );
});

module.exports = config;
