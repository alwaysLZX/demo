import './styles/index.css';
import "./styles/index.scss";
import "./styles/index.less";

export default class Base {
    constructor(name) {
        this.name = name;
    }

    get Name() {
        return this.name;
    }

    set Name(value) {
        this.name = value.toUpperCase();
    }

    printName() {
        this.Name = "xieqian";
        console.log(this.Name);
    }
}

let base = new Base('base');
