import { version } from "../package.json";

export default () => {
    let arr = version.split("");
    let bool = arr.includes("2");
    console.log(bool);
    console.log("version " + version);
    console.log(`我的天呀${arr}我的`);
};
