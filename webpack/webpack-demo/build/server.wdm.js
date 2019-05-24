/**
 * 使用
 * express
 * webpack-dev-middleware
 * webpack-hot-middleware
 * 搭建开发服务器
 */

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const { setWebpackHotMiddlewareClient } = require("./util.js");
const config = require("./webpack.dev.conf.js");
setWebpackHotMiddlewareClient(config, "webpack-hot-middleware/client?reload=true");
// console.log(config.entry);
const compiler = webpack(config);
const app = express();

// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.dev.conf.js 配置文件作为基础配置
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    })
);

app.use(webpackHotMiddleware(compiler));

// 将文件 serve 到 port 3000。
app.listen(3000, function() {
    console.log("Example app listening on port 3000!\n");
});
