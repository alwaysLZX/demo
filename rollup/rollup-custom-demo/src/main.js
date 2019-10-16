import { version } from "../package.json";
import func from "./foo";

const isProduction = () => process.env.NODE_ENV === "production";

export default class RollupMain {
    constructor() {
        this.version = version;
    }

    getVersion() {
        return this.version;
    }

    helloWorld() {
        return func();
    }
}
