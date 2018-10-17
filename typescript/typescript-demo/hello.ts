interface IPerson {
    readonly id: string,
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: IPerson = {
    id:'1',
    name: 'qian_xie',
    age: 18,
    class: '软件133'
};

class Animal {
    private _name: string;
    constructor(name: string, private _age: number) {
        this._name = name;
    }
    Action(): void {
        console.log('I am a animal');
    }
}
