const path = require("path");
let e_v = process.env.NODE_ENV;

process.env.NODE_ENV = "production";

e_v = process.env.NODE_ENV;

function resolve(dir) {
    return path.resolve(__dirname, "..", dir);
}

console.log(path.join("src", "js"));
console.log(path.join("/src", "js"));

console.log(path.resolve("src", "js"));
console.log(path.resolve("/src", "js"));
