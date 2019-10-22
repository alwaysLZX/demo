const babel = require("rollup-plugin-babel");
const package = require("../package.json");
const banner = `
/*!
 * demo v${package.version}
 * (c) 2019-${new Date().getFullYear()} Qian Xie
 * Released under the MIT License.
 */`.trim();

const rollupConfig = {
    external: undefined,
    output: {
        format: "iife",
        banner: banner,
        name: "xqTree"
    },
    plugins: [babel()]
};

module.exports = {
    arg1: {
        external: rollupConfig.external,
        plugins: rollupConfig.plugins
    },
    arg2: {
        ...rollupConfig.output
    }
};
