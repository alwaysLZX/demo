import { version } from "../package.json";
import foo from "./foo";

const isProduction = () => process.env.NODE_ENV === "production";

export default () => {
    console.log(`version ${version} ${isProduction} ${foo()}`);
};
