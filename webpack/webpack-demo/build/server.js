// 这是以node.js API方式启用开发服务器

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.conf');
const host = 'localhost';
const port = 8081;

Object.keys(config.entry).forEach(key => {
    let value = config.entry[key];
    value = value instanceof Array ? value : [value];
    value.unshift(
        // 'react-hot-loader/patch',
        `webpack-dev-server/client?http://${host}:${port}`,
        'webpack/hot/only-dev-server'
    );
    config.entry[key] = value;
});

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, '../dist'),
    open: true,
    overlay: true,
    hot: true,
    hotOnly: true,
    inline: true,
    progress: true
});

server.listen(port, host, function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(`Listening at http://${host}:${port}`);
});
