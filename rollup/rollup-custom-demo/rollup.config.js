import alias from "rollup-plugin-alias";
import replace from "rollup-plugin-replace";
import buble from "rollup-plugin-buble";

const banner = `/*Create By XieQian */`;

export default {
    input: "src/main.js",
    external: undefined,
    output: {
        file: "dist/bundle.js",
        format: "es",
        banner: banner,
        name: "QIAN_XIE"
    },
    plugins: [
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
