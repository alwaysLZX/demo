function setWebpackHotMiddlewareClient(config, client) {
    if (typeof config.entry === "string") {
        config.entry = [config.entry, client];
    } else if (typeof config.entry === "object") {
        if (config.entry instanceof Array) {
            config.entry.push(client);
        } else {
            let obj = {};
            Object.keys(config.entry).forEach(key => {
                if (typeof config.entry[key] === "string") {
                    obj[key] = [config.entry[key], client];
                } else if (config.entry[key] instanceof Array) {
                    obj[key] = [...config.entry[key], client];
                }
            });
            config.entry = obj;
        }
    } else if (typeof config.entry === "function") {
    }
    console.log(config.entry);
}

module.exports = {
    setWebpackHotMiddlewareClient
};
