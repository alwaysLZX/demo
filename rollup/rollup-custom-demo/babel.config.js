const presets = [
    [
        "@babel/env",
        {
            targets: {
                chrome: "40"
            },
            useBuiltIns: "usage",
            modules: false
        }
    ]
];
const plugins = ["@babel/external-helpers"];

module.exports = {
    presets,
    plugins
};
