process.env.NODE_ENV = "production";

const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require("./webpack.base.conf");

const webpackConfig = merge(baseWebpackConfig, {
    mode: "production",
    output: {
        // 很重要，不主动添加publicPath属性时，添加到html的脚本会按照页面相对路径来引用
        // publicPath: ""
    },
    module: {
        rules: []
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css"
        })
    ]
});

module.exports = webpackConfig;
