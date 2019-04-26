const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    entry: {
        app: "./src/main.js"
    },
    output: {
        filename: "js/[name].js",
        path: resolve("dist")
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|vue)$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
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
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.styl(us)?$/,
                use: ["vue-style-loader", "css-loader", "stylus-loader"]
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
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: resolve("src/images/favicon.ico"),
                to: resolve("dist/favicon.ico")
            }
        ]),
        new HtmlWebpackPlugin({
            title: "Custom Vue",
            filename: "index.html",
            template: "index.html",
            hash: true
        })
    ],
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
    }
};
