const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

const webpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "source-map",
    output: {
        // 很重要，不主动添加publicPath属性时，添加到html的脚本会按照页面相对路径来引用
        publicPath: "/"
    },
    plugins: [
        // 开启模块热替换需要
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        // 告诉服务器从哪个目录中提供内容。
        contentBase: resolve("dist"),
        // 打开浏览器
        open: true,
        // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
        overlay: true,
        // 启用 webpack 的模块热替换
        hot: true,
        // 是否只允许模块热替换而禁止刷新
        hotOnly: false
    }
});

module.exports = webpackConfig;
