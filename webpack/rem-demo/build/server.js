const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");
const opn = require('opn');

const port = 3000;

const app = express();
let config = require('./webpack.dev.conf');
parseWebpackEntry(config);
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath || "/"
}));

app.use(webpackHotMiddleware(compiler, {
    path: "/__webpack_hmr",
    reload: true
}));

app.listen(port, function () {
    let url = `http://localhost:${port}`;
    console.log(url);
    opn(url);
});


/**
 * 转换webpack的入口，使之成数组的方式并添加热加载相关代码
 * @param  {object} config
 */
function parseWebpackEntry(config) {
    let entry = config.entry;
    let client = "webpack-hot-middleware/client";
    if (entry !== Object(entry)) {
        throw new Error("webpack entry is not object.");
    }
    Object.keys(entry).forEach(item => {
        if (!(entry[item] instanceof Array)) {
            entry[item] = [entry[item]];
        }
        if (entry[item].indexOf(client) <= -1) {
            entry[item].unshift(client);
        }
    });
}
