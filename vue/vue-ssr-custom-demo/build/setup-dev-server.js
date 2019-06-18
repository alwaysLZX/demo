const fs = require("fs");
const path = require("path");
const MFS = require("memory-fs");
const webpack = require("webpack");
const chokidar = require("chokidar");
const clientConfig = require("./webpack.client.conf");
const serverConfig = require("./webpack.server.conf");

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), "utf-8");
    } catch (e) {}
};

module.exports = function setupDevServer(app, templatePath, cb) {
    let bundle;
    let template;
    let clientManifest;

    let ready;
    const readyPromise = new Promise(r => {
        ready = r;
    });

    const update = () => {
        if (bundle && clientManifest) {
            ready();
            cb(bundle, {
                template,
                clientManifest
            });
        }
    };

    // 监听模板是否修改
    template = fs.readFileSync(templatePath, "utf-8");
    chokidar.watch(templatePath).on("change", () => {
        template = fs.readFileSync(templatePath, "utf-8");
        console.log("template.html被修改，触发更新");
        update();
    });

    clientConfig.entry.app = [clientConfig.entry.app, "webpack-hot-middleware/client"];
    clientConfig.output.filename = "[name].js";
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());

    // 开发中间件
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    });
    app.use(devMiddleware);
    clientCompiler.plugin("done", stats => {
        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));
        if (stats.errors.length) return;

        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, "vue-ssr-client-manifest.json"));

        console.log("client被修改，触发更新");
        update();
    });

    // 热更新中间件
    app.use(require("webpack-hot-middleware")(clientCompiler, { heartbeat: 5000 }));

    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) return;

        bundle = JSON.parse(readFile(mfs, "vue-ssr-server-bundle.json"));

        console.log("server被修改，触发更新");
        update();
    });

    return readyPromise;
};
