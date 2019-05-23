const Vue = require("vue");
const express = require("express")();
const { createBundleRenderer } = require("vue-server-renderer");

const template = require("fs").readFileSync("./src/index.html", "utf-8");
const serverBundle = require("../dist/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
});

express.get("*", (req, res) => {
    const context = { url: req.url };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log(err);
            if (err.code === 404) {
                res.status(404).end("Page not found");
            } else {
                res.status(500).end("Internal Server Error");
            }
        } else {
            res.end(html);
        }
    });
});

// 服务器监听地址
express.listen(8080, () => {
    console.log("服务器已启动！");
});
