const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const resolve = dir => path.join(__dirname, "..", dir);
const isProduction = process.env.NODE_ENV === "production";

const config = {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? false : "#cheap-module-source-map",
    output: {
        path: resolve("dist"),
        publicPath: "/",
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
                use: isProduction
                    ? ExtractTextPlugin.extract({
                          fallback: "vue-style-loader",
                          use: ["css-loader", "postcss-loader"]
                      })
                    : ["vue-style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.scss$/,
                use: isProduction
                    ? ExtractTextPlugin.extract({
                          fallback: "vue-style-loader",
                          use: ["css-loader", "postcss-loader", "sass-loader"]
                      })
                    : ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024 * 10,
                            name: "images/[name].[hash:8].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
        extensions: [".js", ".vue", ".json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": path.resolve(__dirname, "../src")
        }
    }
};

if (isProduction) {
    config.plugins.push(
        new ExtractTextPlugin({
            filename: "styles/[name].css",
            allChunks: true
        })
    );
}

module.exports = config;
