const path = require("path");
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
                use: [isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader", "css-loader", "postcss-loader"]
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
                            limit: 1024 * 10,
                            context: resolve("./"),
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
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[name].chunk.css"
        })
    );
}

module.exports = config;
