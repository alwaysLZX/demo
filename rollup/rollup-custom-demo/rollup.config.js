import json from "rollup-plugin-json";
import alias from "rollup-plugin-alias";
import replace from "rollup-plugin-replace";
import buble from "rollup-plugin-buble";

import { version } from "./package.json";
const banner = `
/*!
 * demo v${version}
 * (c) 2019-${new Date().getFullYear()} Qian Xie
 * Released under the MIT License.
 */`.trim();

export default {
    input: "src/main.js",
    external: undefined,
    output: {
        file: "dist/bundle.js",
        format: "umd",
        banner: banner,
        name: "DEMO"
    },
    plugins: [
        json(),
        alias({
            resolve: [".js"]
        }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        buble()
    ],
    onwarn: (msg, warn) => {
        warn(msg);
    }
};
