import util from "./scripts/ts/util";

function testDemo(str: string) {
    console.log([1, 2, "123"].includes(str));
    return str.toLowerCase().toUpperCase();
}

testDemo("aaa");
