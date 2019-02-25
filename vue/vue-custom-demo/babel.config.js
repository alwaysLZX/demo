const babelConfig = {
    presets: [
        [
            "@babel/preset-env",   // 可以去掉preset，简写为@babel/env
            {
                targets: {
                    // 支持浏览器的最低版本
                    // chrome: "67",
                    // opera: "",
                    // edge: "17",
                    // firefox: "60",
                    // safari: "11.1",
                    ie: '7',
                    // ios: '',
                    // android: '',
                    // node: '',
                },
                // 只加载需要的polyfill
                useBuiltIns: "usage"
            }
        ]
    ],
    plugins: [

    ]
};

module.exports = babelConfig;
