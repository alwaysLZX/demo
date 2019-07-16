module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    chrome: "40"
                },
                useBuiltIns: "usage",
                modules: false,
                corejs: 2
            }
        ]
    ];
    const plugins = [];

    return {
        presets,
        plugins
    };
};
