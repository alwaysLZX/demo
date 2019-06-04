const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const resolve = dir => path.join(__dirname, "..", dir);

const isProduction = process.argv.indexOf("--mode=production") > -1;

module.exports = {
    // 多入口
    entry: {
        index: "./src/index.js",
        main: "./src/main.js",
        other: "./src/other.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "../dist/")
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css/,
                use: isProduction
                    ? ExtractTextPlugin.extract({
                          fallback: "style-loader",
                          use: [
                              {
                                  loader: "css-loader",
                                  options: {
                                      modules: true,
                                      importLoaders: 1,
                                      localIdentName: "[name]-[local]-[hash:base64:5]"
                                  }
                              },
                              "postcss-loader"
                          ]
                      })
                    : [
                          "style-loader",
                          {
                              loader: "css-loader",
                              options: {
                                  modules: true,
                                  importLoaders: 1,
                                  localIdentName: "[name]-[local]-[hash:base64:5]"
                              }
                          },
                          "postcss-loader"
                      ]
            },
            {
                test: /.less$/,
                use: isProduction
                    ? ExtractTextPlugin.extract({
                          fallback: "style-loader",
                          use: ["css-loader", "postcss-loader", "less-loader"]
                      })
                    : ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // 文件大小小于此限制则以base64的形式显示文件[单位：字节]
                            limit: 1024 * 100,
                            // context: resolve("src"), // 影响name中[path]值
                            // name: "[path][name].[hash:8].[ext]"
                            publicPath: "../",
                            name: "images/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        /*
         * 根目录很重要，该插件只会删除根目录下的文件
         * 如果发现一直删除不了指定文件，可能指定的文件在根目录之外，此时插件会忽略
         */
        new CleanWebpackPlugin("dist", {
            root: path.join(__dirname, "../")
        }),
        // 推荐使用绝对路径
        new CopyWebpackPlugin([
            {
                from: "./src/assets/images/favicon.ico",
                to: "favicon.ico"
            },
            {
                from: path.join(__dirname, "../src/assets/images/"),
                to: path.join(__dirname, "../dist/assets/images/")
            }
        ]),
        // 自动加载模块，而不必到处 import 或 require
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        new HtmlWebpackPlugin({
            title: "index页面",
            filename: "index.html",
            template: "./src/assets/template.html",
            chunks: ["vendor", "common", "index"],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: "main页面",
            filename: "main.html",
            template: "./src/assets/template.html",
            chunks: ["vendor", "common", "main"],
            hash: true
        }),
        new HtmlWebpackPlugin({
            title: "other页面",
            filename: "other.html",
            template: "./src/assets/template.html",
            chunks: ["vendor", "common", "other"],
            hash: true
        })
    ],
    resolve: {
        // 自动解析确定的扩展名，此配置会覆盖默认配置
        extensions: [".js", ".json", ".jsx", ".less", ".css"],
        /*
        创建 import 或 require 的别名，来确保模块引入变得更简单
        示例：import Upper from '@/utils/util';
        */
        alias: {
            "@": path.resolve(__dirname, "../src")
        }
    },
    // 配置如何展示性能提示
    performance: {
        hints: "warning",
        // 入口起点文件大小
        maxEntrypointSize: 1024 * 1024,
        // 资源最大大小
        maxAssetSize: 1024 * 1024,
        // 控制用于计算性能提示的文件
        assetFilter: function(assetFilename) {
            return !/\.map$/.test(assetFilename);
        }
    },
    // // 默认配置
    // optimization: {
    //     splitChunks: {
    //         chunks: "async",// all async initial
    //         minSize: 30000,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         automaticNameDelimiter: "~",
    //         name: true,
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 priority: -10
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // },
    optimization: {
        // 模块拆分
        splitChunks: {
            cacheGroups: {
                // vendor的优先级比common的高
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10 // 优先级
                }
                // common: {
                //     name: "common",
                //     test: /[\\/]src[\\/]/,
                //     minSize: 1024,
                //     chunks: "all",
                //     priority: 5
                // }
            }
        }
    }
};
