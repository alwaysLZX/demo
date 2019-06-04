const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = merge(baseConfig, {
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
                },
                common: {
                    name: "common",
                    test: /[\\/]src[\\/]/,
                    minSize: 1024,
                    chunks: "all",
                    priority: 5
                }
            }
        }
    }
});

// if (process.env.NODE_ENV === 'production') {
//     config.plugins.push(
//       new SWPrecachePlugin({
//         cacheId: 'vue-hn',
//         filename: 'service-worker.js',
//         minify: true,
//         dontCacheBustUrlsMatching: /./,
//         staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//         runtimeCaching: [
//           {
//             urlPattern: '/',
//             handler: 'networkFirst'
//           },
//           {
//             urlPattern: /\/(top|new|show|ask|jobs)/,
//             handler: 'networkFirst'
//           },
//           {
//             urlPattern: '/item/:id',
//             handler: 'networkFirst'
//           },
//           {
//             urlPattern: '/user/:id',
//             handler: 'networkFirst'
//           }
//         ]
//       })
//     )
//   }
