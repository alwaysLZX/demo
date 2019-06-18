const webpack = require("webpack");
const merge = require("webpack-merge");
const WorkboxPlugin = require("workbox-webpack-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const baseConfig = require("./webpack.base.conf.js");
const isProduction = process.env.NODE_ENV === "production";

const config = merge(baseConfig, {
    entry: {
        app: "./src/entry-client.js"
    },
    output: {
        filename: "client.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            "process.env.VUE_ENV": JSON.stringify("client")
        }),
        new VueSSRClientPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
});

if (isProduction) {
    config.plugins.push(
        // 渐进式网络应用程序
        new WorkboxPlugin.GenerateSW({
            cacheId: "fz-cache-id",
            swDest: "service-worker.js",
            importWorkboxFrom: "cdn", // local cdn
            importsDirectory: "sw",
            precacheManifestFilename: "precache-manifest.[manifestHash].js",
            clientsClaim: true,
            skipWaiting: true,
            // 运行时缓存
            runtimeCaching: [
                {
                    urlPattern: /\/f\/sys\/attach\/qrCode/,
                    handler: "NetworkFirst"
                }
            ]
        })
    );
}

module.exports = config;
