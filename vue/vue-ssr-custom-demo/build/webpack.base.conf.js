const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
const resolve = dir => path.join(__dirname, "..", dir);

const config = {
    mode: isProduction ? "production" : "development",
    output: {
        path: resolve("dist"),
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]-[local]-[hash:base64:5]"
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 文件大小小于此限制则以base64的形式显示文件[单位：字节]
                            limit: 1024 * 100,
                            context: "./src",
                            name: "[path][name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        // 自动解析确定的扩展名，此配置会覆盖默认配置
        extensions: [".vue", ".js", ".json"],
        /*
        创建 import 或 require 的别名，来确保模块引入变得更简单
        示例：import Upper from '@/utils/util';
        */
        alias: {
            // 加上$符号，表示精准匹配
            vue$: "vue/dist/vue.esm.js",
            "@": path.resolve(__dirname, "../src")
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minChunks: 1
                }
            }
        }
    }
};

if (isProduction) {
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    );
}

module.exports = config;
